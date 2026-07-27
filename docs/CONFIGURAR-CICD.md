# Configurar CI/CD — GitHub Actions Secrets

## Qué hace el pipeline

Cada vez que se mergea un PR a `main`:
1. ✅ Corre tests del backend (Jest)
2. ✅ Corre lint + tests del frontend (ng lint + ng test)
3. ✅ Si pasan → Build Angular + Build Docker images
4. ✅ Push imágenes a ECR
5. ✅ SSH al EC2 → docker-compose pull + up
6. ❌ Si tests fallan → NO se despliega → se ve el error en GitHub Actions

---

## Secrets a configurar

Ve a: **GitHub → Repo → Settings → Secrets and variables → Actions → New repository secret**

Configura estos 4 secrets:

| Secret | Valor | De dónde se obtiene |
|--------|-------|---------------------|
| `AWS_ACCESS_KEY_ID` | `AKIAS6AWFHHIIUF4KO2SW` | IAM → Users → crumbs-deployer → Security credentials |
| `AWS_SECRET_ACCESS_KEY` | *(el secret key)* | El que guardaste al crear el access key |
| `EC2_HOST` | `54.157.111.61` | IP pública del EC2 |
| `EC2_SSH_PRIVATE_KEY` | *(contenido del .pem)* | Ver instrucciones abajo |

### Cómo obtener el contenido del .pem

Ejecuta en tu terminal:

```bash
cat ~/.ssh/crumbs-ec2.pem
```

Copia **TODO** el contenido (incluyendo `-----BEGIN RSA PRIVATE KEY-----` y `-----END RSA PRIVATE KEY-----`) y pégalo como valor del secret `EC2_SSH_PRIVATE_KEY`.

---

## Verificar que funciona

1. Configura los 4 secrets en GitHub
2. Haz un cambio pequeño en cualquier archivo
3. Crea un PR → merge a main
4. Ve a **Actions** tab en GitHub → deberías ver el pipeline corriendo
5. Si todo pasa (verde) → la app se actualiza automáticamente en http://54.157.111.61

---

## Si falla

- Ve a **Actions** → click en el run que falló → ve los logs de cada step
- Los errores más comunes:
  - Tests fallan → corregir el código antes de mergear
  - AWS credentials inválidas → verificar los secrets
  - SSH falla → verificar que EC2_SSH_PRIVATE_KEY tiene el contenido completo del .pem
  - ECR push falla → verificar que el usuario IAM tiene permisos de ECR

---

## Flujo de trabajo del equipo

```
1. Cada dev trabaja en su rama (feature/xxx)
2. Hace PR a main
3. Los compañeros revisan el PR
4. Al aprobar y mergear → GitHub Actions se activa automáticamente:
   - Tests ✅ → Build ✅ → Deploy ✅
5. En ~3 minutos, los cambios están en producción
```

---

## Diagrama del pipeline

```
git merge to main
       │
       ▼
┌─────────────────────────┐
│  GitHub Actions          │
│                          │
│  ┌─────────┐ ┌────────┐ │
│  │ Backend │ │Frontend│ │  ← Paralelo
│  │  Tests  │ │ Tests  │ │
│  └────┬────┘ └───┬────┘ │
│       │           │      │
│       ▼           ▼      │
│  ┌─────────────────────┐ │
│  │ Build + Push ECR    │ │  ← Solo si tests pasan
│  └──────────┬──────────┘ │
│             │            │
│  ┌──────────▼──────────┐ │
│  │ SSH → EC2 redeploy  │ │
│  └─────────────────────┘ │
└─────────────────────────┘
       │
       ▼
  App actualizada en
  http://54.157.111.61
```
