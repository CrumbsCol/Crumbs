# Historias de Usuario — Crumbs

> **Proyecto:** Crumbs  
> **Fecha de creación:** 20/07/2026  
> **Última actualización:** 23/07/2026  
> **Autor:** Jesus Alberto Marriaga Lindarte

---

## HU_CRUMBS_001 — Inicio de sesión

**Módulo:** Autenticación  
**Usuarios:** Externo

### Resumen

Permitir que los usuarios registrados inicien sesión de forma segura mediante sus credenciales (correo/usuario y contraseña). El beneficio es permitir el acceso a las funcionalidades privadas y personalizadas de la aplicación, garantizando la seguridad de la cuenta del usuario.

### Descripción

Como usuario registrado de la aplicación quiero ingresar mis credenciales de acceso para entrar a mi cuenta y utilizar las funciones privadas de la plataforma.

### Precondiciones

- Estar registrado.

### Campos de entrada

| # | Campo | Tipo | Longitud | Obligatorio | Descripción |
|---|-------|------|----------|-------------|-------------|
| 1 | Identificador (Correo / Usuario) | email/texto | 100 | Sí | Correo electrónico o nombre de usuario con el que se registró. |
| 2 | Contraseña | Alfanumérico | 20 | Sí | Clave de acceso secreta (oculta visualmente mediante máscara de texto). |

### Criterios de aceptación

**CR01. Validación de campos obligatorios**  
- **Dado** que el usuario se encuentra en el formulario de inicio de sesión  
- **Cuando** intenta presionar el botón de inicio de sesión omitiendo el identificador o la contraseña  
- **Entonces** el sistema debe marcar el campo vacío en un estado de error visual y mostrar un mensaje de advertencia.

**CR02. Control de accesos erróneos**  
- **Dado** que el usuario ingresó datos en los campos de acceso  
- **Cuando** el identificador o la contraseña no coinciden con los registros del sistema  
- **Entonces** la aplicación debe mostrar el mensaje: "Usuario o contraseña incorrectos".

**CR03. Redirección exitosa**  
- **Dado** que el usuario completó los campos del formulario  
- **Cuando** digita las credenciales correctas y presiona el botón de inicio de sesión  
- **Entonces** el sistema debe dar acceso inmediato y redirigir al usuario a la pantalla principal (Home o Dashboard).

**CR04. Persistencia de la sesión**  
- **Dado** que el usuario ha iniciado sesión con éxito  
- **Cuando** cierra la aplicación o el navegador y la vuelve a abrir sin haber cerrado sesión explícitamente  
- **Entonces** el sistema debe mantener el token de sesión activo y permitirle ingresar directamente sin loguearse de nuevo.

### Dependencias

- Servicio de base de datos de usuarios y API de autenticación.

### Supuestos y restricciones

- **SP01.** La validación y el cifrado de datos sensibles se procesan del lado del servidor.
- **RS01.** Todo el canal de comunicación entre la aplicación y el servidor debe estar protegido bajo protocolos seguros (HTTPS / SSL).

### Recomendaciones

Evaluar a futuro la inclusión de un botón para "Ver/Ocultar" contraseña en el campo de texto y opciones de inicio de sesión con redes sociales (OAuth) o biometría.

### Criterios de terminación

El usuario logra ingresar a la pantalla principal de la aplicación tras digitar correctamente sus credenciales.

### Flujo normal

| Paso | Actor | Sistema |
|------|-------|---------|
| 1 | Ingresa a la página web y selecciona la opción "Ya tengo una cuenta". | Despliega el formulario de inicio de sesión con los campos de identificador y contraseña. |
| 2 | Digita su identificador (correo/usuario) y su contraseña. | Permite la lectura y el enmascaramiento visual de la contraseña. |
| 3 | Selecciona el botón "Iniciar sesión". | Valida las credenciales en el servidor, genera el token de acceso y otorga ingreso al sistema. |

**Post-condición:** El usuario se encuentra autenticado dentro del sistema y es redirigido a la pantalla principal (Home o Dashboard) con su sesión activa.

### Historial de versiones

| Versión | Fecha | Cambio |
|---------|-------|--------|
| 1.0 | 20/07/2026 | Creación de Historia de Usuario |

---

## HU_CRUMBS_002 — Registro de Usuario

**Módulo:** Autenticación  
**Usuarios:** Externo

### Resumen

Permitir que los nuevos usuarios creen una cuenta en la aplicación proporcionando sus datos personales y credenciales de acceso. El beneficio es que el sistema guarde su identidad de manera única para que puedan administrar sus propios gastos, registrar salidas y vincularse activamente con otros integrantes dentro de la plataforma.

### Descripción

Como usuario nuevo de la aplicación quiero registrarme en el sistema ingresando mis datos para tener una cuenta personal y poder utilizar las funciones de Crumbs.

### Precondiciones

- No tener una cuenta registrada previamente con el mismo correo electrónico.

### Campos de entrada

| # | Campo | Tipo | Longitud | Obligatorio | Descripción |
|---|-------|------|----------|-------------|-------------|
| 1 | Nombre Completo | Texto | 100 | Sí | Nombre y apellido del usuario. |
| 2 | Correo Electrónico | Email | 100 | Sí | Dirección de correo que servirá como identificador único de acceso. |
| 3 | Sobrenombre | Texto | 30 | Sí | Alias o nickname con el que el usuario será visualizado por otros integrantes. |
| 4 | Contraseña | Alfanumérico | 20 | Sí | Clave de acceso secreta (mínimo 8 caracteres). |
| 5 | Verificar contraseña | Alfanumérico | 20 | Sí | Confirmación exacta de la clave de acceso digitada anteriormente. |

### Criterios de aceptación

**CR01. Validación de campos obligatorios**  
- **Dado** que el usuario se encuentra en el formulario de registro  
- **Cuando** presiona el botón de registro omitiendo cualquiera de los campos requeridos  
- **Entonces** el sistema debe marcar visualmente los inputs vacíos en estado de error y detener el proceso de creación.

**CR02. Validación de longitud y formato de contraseña**  
- **Dado** que el usuario está completando el campo de contraseña  
- **Cuando** ingresa una clave que tiene menos de 8 caracteres o no es alfanumérica  
- **Entonces** el sistema debe bloquear el envío del formulario y mostrar un mensaje de advertencia específico.

**CR03. Confirmación exacta de contraseña**  
- **Dado** que el usuario ingresó una contraseña válida  
- **Cuando** digita un valor diferente en el campo "Verificar contraseña" e intenta enviar el formulario  
- **Entonces** el sistema debe alertar visualmente al usuario con el mensaje: "Las contraseñas no coinciden".

**CR04. Control de duplicidad de correo**  
- **Dado** que el usuario completó todos los datos del formulario correctamente  
- **Cuando** el correo electrónico ingresado ya existe en la base de datos de la aplicación  
- **Entonces** el sistema debe denegar el registro y mostrar el mensaje de error: "El correo electrónico ya se encuentra registrado".

### Dependencias

- Servicio de base de datos de usuarios y API de autenticación.

### Supuestos y restricciones

- **SP01.** Las validaciones de formato de correo y longitud de contraseña se ejecutan en primera instancia en el frontend para mejorar la experiencia de usuario, y se revalidan obligatoriamente en el servidor.
- **RS01.** Todo el canal de comunicación entre la aplicación y el servidor debe estar protegido bajo protocolos seguros (HTTPS / SSL).

### Historias relacionadas

- `HU_CRUMBS_001` (Inicio de sesión).

### Recomendaciones

Evaluar a futuro la inclusión de un indicador visual de "fuerza de la contraseña" (débil, media, fuerte) mientras el usuario la digita.

### Criterios de terminación

El usuario es registrado exitosamente en la base de datos y se le redirige automáticamente a la pantalla de inicio de sesión o se inicia su sesión por primera vez de forma directa.

### Flujo normal

| Paso | Actor | Sistema |
|------|-------|---------|
| 1 | Ingresa a la página web y selecciona la opción de registro ("Registrarse"). | Despliega el formulario de registro. |
| 2 | Digita su nombre completo, correo electrónico, sobrenombre, contraseña y verificación de contraseña. | Permite la inserción de los datos y enmascara visualmente los campos de contraseña. |
| 3 | Selecciona el botón "Registrarse". | Valida los datos, guarda el nuevo usuario de forma segura y confirma el éxito de la operación. |

**Post-condición:** El usuario queda registrado de manera única en el sistema.

### Flujo alternativo 1 — Contraseñas no coinciden

| Paso | Actor | Sistema |
|------|-------|---------|
| 1 | Digita una contraseña y una verificación diferente. | — |
| 2 | Selecciona el botón de registro. | Detiene el proceso, aplica un estado de error visual en los campos de contraseña y muestra el mensaje: "Las contraseñas no coinciden". |

**Post-condición:** El registro no se completa; el usuario permanece en el formulario para corregir.

### Historial de versiones

| Versión | Fecha | Cambio |
|---------|-------|--------|
| 1.0 | 20/07/2026 | Creación de Historia de Usuario |
| 1.1 | 23/07/2026 | Corrección terminológica: "miembros" → "integrantes" (personas de la salida). |

---

## HU_CRUMBS_003 — Crear Salida

**Módulo:** Gestión de Salidas  
**Usuarios:** Externo

### Resumen

Permitir que un usuario autenticado cree un nuevo espacio grupal o "Salida" asignándole un nombre identificador. El beneficio es habilitar el entorno común donde convivirán los integrantes y se registrarán colectivamente todos los gastos del plan.

### Descripción

Como usuario registrado de la aplicación quiero crear una nueva salida asignándole un nombre para iniciar un espacio donde organizar y dividir los gastos con mis amigos.

### Precondiciones

- El usuario debe estar autenticado en la aplicación (sesión activa).

### Campos de entrada

| # | Campo | Tipo | Longitud | Obligatorio | Descripción |
|---|-------|------|----------|-------------|-------------|
| 1 | Nombre de la salida | Alfanumérico | 20 | Sí | Título o nombre identificador que tendrá el plan o grupo de gastos (ej. "Cena Luis"). |

### Campos de salida

| # | Campo | Tipo | Longitud | Descripción |
|---|-------|------|----------|-------------|
| 1 | Código de invitación | Alfanumérico | 6 | Código único generado automáticamente por el sistema para que otros se unan. |

### Criterios de aceptación

**CR01. Validación de campo obligatorio**  
- **Dado** que el usuario está en la ventana de creación de salidas  
- **Cuando** intenta presionar el botón de creación dejando el campo del nombre vacío  
- **Entonces** el sistema debe aplicar un estado de error visual en el input y mostrar un mensaje de advertencia.

**CR02. Restricción de longitud máxima**  
- **Dado** que el usuario está escribiendo en el campo "Nombre de la salida"  
- **Cuando** alcanza el límite de 20 caracteres en la interfaz  
- **Entonces** el sistema debe restringir y no permitir la digitación de ningún carácter adicional.

**CR03. Generación automática del código de la salida**  
- **Dado** que el usuario ingresó un nombre válido para la salida  
- **Cuando** presiona el botón para procesar la creación exitosamente  
- **Entonces** el sistema debe generar automáticamente un código único de 6 caracteres alfanuméricos asociado a dicha salida.

**CR04. Asignación del rol de Creador**  
- **Dado** que un usuario autenticado inicia la creación de un plan  
- **Cuando** la salida se guarda de forma exitosa en la base de datos  
- **Entonces** el sistema debe registrar internamente a ese usuario con el rol de "Creador de la salida".

**CR05. Redirección al entorno de la salida**  
- **Dado** que el registro de la salida se procesó correctamente en el backend  
- **Cuando** finaliza la operación de guardado  
- **Entonces** el sistema debe redirigir al usuario automáticamente a la vista interna de la salida recién creada, mostrando su nombre y el código para compartir.

### Dependencias

- Servicio de base de datos.

### Supuestos y restricciones

- **SP01.** El código de 6 caracteres debe ser completamente aleatorio y el sistema debe asegurar su unicidad global en la base de datos para evitar colisiones entre distintas salidas.

### Historias relacionadas

- `HU_CRUMBS_001` (Inicio de sesión).
- `HU_CRUMBS_004` (Agregar integrantes).

### Criterios de terminación

La salida queda guardada en la base de datos y el usuario visualiza el Dashboard o espacio en blanco de la salida con su respectivo código de invitación.

### Flujo normal

| Paso | Actor | Sistema |
|------|-------|---------|
| 1 | Selecciona la opción de "Crear salida" en su pantalla principal. | Despliega un formulario o ventana emergente solicitando el nombre de la salida. |
| 2 | Digita el nombre de la salida (máximo 20 caracteres) y presiona "Guardar" o "Crear". | Valida la entrada, genera el código único de 6 caracteres, guarda el registro asociando al usuario como creador y redirecciona. |
| 3 | Visualiza la pantalla interna de la salida con el código generado listo para compartir. | Muestra la interfaz de la salida en su estado inicial (sin gastos aún). |

**Post-condición:** La salida está creada y el usuario se encuentra dentro de ella listo para agregar integrantes o gastos.

### Historial de versiones

| Versión | Fecha | Cambio |
|---------|-------|--------|
| 1.0 | 20/07/2026 | Creación de Historia de Usuario |

---

## HU_CRUMBS_004 — Agregar integrantes a la salida

**Módulo:** Gestión de Salidas  
**Usuarios:** Registrado (Cualquier integrante dentro de la salida)

### Resumen

Permitir que cualquier integrante de una salida agregue a otras personas al espacio. Esto se puede hacer de dos formas: digitando un nombre para crear un "invitado fantasma" (usuario no registrado) o ingresando el nickname (sobrenombre) de un usuario existente para vincularlo directamente.

### Descripción

Como integrante de una salida quiero agregar a otros integrantes por su nombre o mediante su nickname de usuario para que puedan ser incluidos en el reparto de los gastos del plan.

### Precondiciones

- El usuario debe encontrarse dentro de la vista específica de la salida a la cual desea añadir integrantes.

### Campos de entrada

| # | Campo | Tipo | Longitud | Obligatorio | Descripción |
|---|-------|------|----------|-------------|-------------|
| 1 | Nombre del integrante (Fantasma) | Texto | 12 | Sí (solo si elige opción fantasma) | Nombre o alias con el que se identificará al invitado temporal en los gastos. |
| 2 | Nickname de usuario | Alfanumérico | 30 | Sí (solo si elige opción por nickname) | Sobrenombre único con el que se registró el usuario existente en el sistema. |

### Criterios de aceptación

**CR01. Validación de campos de opción**  
- **Dado** que el usuario abrió el panel para añadir integrantes a la salida  
- **Cuando** intenta presionar el botón de agregar dejando vacío el campo de la opción que seleccionó  
- **Entonces** el sistema debe marcar el input correspondiente en estado de error visual.

**CR02. Restricción de longitud de nombre (Fantasma)**  
- **Dado** que el usuario selecciona la opción de invitado fantasma  
- **Cuando** escribe en el cuadro de texto para el nombre  
- **Entonces** la interfaz debe limitar la escritura a un máximo estricto de 12 caracteres.

**CR03. Búsqueda y vinculación por nickname**  
- **Dado** que el usuario digita un sobrenombre en la opción de búsqueda por nickname  
- **Cuando** presiona el botón "Agregar" y el nickname existe exactamente en el sistema  
- **Entonces** el sistema debe vincular de inmediato al usuario registrado a la lista de integrantes de esa salida.

**CR04. Validación de usuario inexistente por nickname**  
- **Dado** que el usuario realiza la búsqueda por nickname  
- **Cuando** el backend procesa el texto y determina que el nickname ingresado no corresponde a ningún usuario registrado  
- **Entonces** la aplicación debe detener el proceso y mostrar el mensaje de error: "El nickname ingresado no existe".

**CR05. Control de duplicados en la salida**  
- **Dado** que un integrante (fantasma o registrado) ya forma parte activa de la salida actual  
- **Cuando** el usuario intenta ingresarlo de nuevo mediante cualquiera de las dos opciones  
- **Entonces** el sistema debe rechazar la inserción y mostrar el mensaje: "Este integrante ya forma parte de la salida".

### Dependencias

- Servicio de base de datos (Entidades Salida, Usuario e Integrante).

### Supuestos y restricciones

- **SP01.** Los invitados fantasma solo existen en el contexto de la salida donde fueron creados; no poseen credenciales de acceso ni cuenta global en el sistema.
- **RS01.** El nickname debe ser un campo único en el sistema (controlado en el registro) para evitar ambigüedades al momento de agregar un usuario por este medio.

### Historias relacionadas

- `HU_CRUMBS_002` (Registro de usuario — donde se define el nickname).
- `HU_CRUMBS_003` (Crear salida).
- `HU_CRUMBS_005` (Registrar gasto).

### Criterios de terminación

El nuevo integrante (registrado por nickname o fantasma) aparece visible de inmediato en la lista de integrantes de la salida.

### Flujo normal

| Paso | Actor | Sistema |
|------|-------|---------|
| 1 | Selecciona la opción de "Agregar integrante" dentro de la salida. | Abre el panel o modal correspondiente. |
| 2 | Elige la opción por Nickname, digita el apodo de su amigo y presiona "Agregar". | Busca al usuario en la base de datos, valida que exista, lo vincula a la salida y actualiza la pantalla. |

**Post-condición:** El usuario registrado queda añadido a la salida.

### Flujo alternativo 1 — Nickname no existe

| Paso | Actor | Sistema |
|------|-------|---------|
| 1 | Ingresa un nickname que no pertenece a ningún usuario. | Al procesar la búsqueda, el backend devuelve un resultado vacío. |
| 2 | Presiona el botón "Agregar". | Detiene la inserción, resalta el campo en rojo y muestra el mensaje: "El nickname ingresado no existe". |

**Post-condición:** No se añade ningún integrante a la salida.

### Historial de versiones

| Versión | Fecha | Cambio |
|---------|-------|--------|
| 1.0 | 20/07/2026 | Creación de Historia de Usuario |
| 1.1 | 23/07/2026 | Corrección terminológica: "miembro" → "integrante" (4 ocurrencias); "participantes" → "integrantes" (agregar a salida, no a gasto). |

---

## HU_CRUMBS_005 — Registrar gasto

**Módulo:** Gestión de Salidas  
**Usuarios:** Registrado (Cualquier integrante dentro de la salida)

### Resumen

Permitir que cualquier integrante registrado dentro de una salida agregue un nuevo gasto especificando el monto, título, fecha, descripción, quién lo pagó y qué participantes entran. El beneficio es mantener el registro de consumos actualizado para que el motor de la aplicación pueda calcular los balances de forma correcta.

### Descripción

Como integrante de una salida quiero registrar un gasto con su monto, título, fecha, descripción, pagador y participantes seleccionados para que el sistema lo procese en la cuenta de la salida.

### Precondiciones

- El usuario debe estar autenticado en la aplicación.
- El usuario debe estar dentro de la vista específica de la salida donde desea añadir el gasto.
- La salida debe tener al menos un integrante añadido (además del creador) para poder dividir el gasto.

### Campos de entrada

| # | Campo | Tipo | Longitud | Obligatorio | Descripción |
|---|-------|------|----------|-------------|-------------|
| 1 | Título del gasto | Alfanumérico | 12 | Sí | Nombre corto o concepto del gasto (ej. "Cena", "Gasolina"). |
| 2 | Monto | Numérico | 7 dígitos | Sí | Valor total del gasto en pesos (no permite decimales ni números negativos). |
| 3 | Fecha | Fecha | DD/MM/AAAA | Sí | Día en que se efectuó el gasto. |
| 4 | Descripción | Texto | 100 | No | Nota o detalle adicional sobre el gasto (ej. "Restaurante italiano del centro"). |
| 5 | Pagador | Selección única | Lista desplegable | Sí | Selección manual del integrante de la salida que adelantó el dinero. |
| 6 | Participantes | Selección múltiple | Lista de casillas | Sí | Lista de integrantes de la salida que entran en el reparto de este gasto específico. |

### Criterios de aceptación

**CR01. Validación de campos obligatorios**  
- **Dado** que el usuario se encuentra en el formulario de registro de gastos  
- **Cuando** intenta presionar el botón de guardar omitiendo el título, el monto, la fecha, el pagador o desmarcando a todos los participantes  
- **Entonces** el sistema debe marcar visualmente los campos vacíos en estado de error y denegar el guardado.

**CR02. Restricción de longitud de título**  
- **Dado** que el usuario está escribiendo en el campo "Título del gasto"  
- **Cuando** intenta escribir más de 12 caracteres  
- **Entonces** la interfaz debe bloquear la entrada impidiendo caracteres adicionales.

**CR03. Validación de monto (Rango y signo)**  
- **Dado** que el usuario interactúa con el campo de entrada "Monto"  
- **Cuando** digita un número negativo, letras, un cero o un valor que excede los 7 dígitos  
- **Entonces** el sistema debe disparar un estado de error visual y bloquear la acción de guardar.

**CR04. Selección manual de pagador**  
- **Dado** que el usuario abre el formulario de un nuevo gasto  
- **Cuando** la pantalla se carga por primera vez  
- **Entonces** el sistema debe presentar el campo "Pagador" completamente vacío en formato de lista desplegable para obligar a una selección manual por parte del usuario.

**CR05. Selección de participantes**  
- **Dado** que la salida cuenta con múltiples integrantes registrados o fantasmas  
- **Cuando** el usuario carga el formulario de gastos  
- **Entonces** el sistema debe listar a todos los integrantes de la salida con sus casillas de selección marcadas por defecto.

### Dependencias

- `HU_CRUMBS_003` (Crear salida) y `HU_CRUMBS_004` (Agregar integrantes).

### Supuestos y restricciones

- **SP01.** Los integrantes nuevos agregados a la salida con posterioridad a este registro solo aplicarán para gastos futuros; no alterarán de forma retroactiva este gasto ya guardado.

### Historias relacionadas

- `HU_CRUMBS_006` (Marcar invitados — F5).
- `HU_CRUMBS_007` (División equitativa y manual — F6).

### Criterios de terminación

El gasto queda guardado en la base de datos y se visualiza correctamente en el historial o lista de gastos de la salida.

### Flujo normal

| Paso | Actor | Sistema |
|------|-------|---------|
| 1 | Selecciona la opción de "Registrar gasto" dentro de la vista de la salida. | Despliega el formulario con los campos de título, monto, fecha, descripción, lista de pagadores y lista de participantes. |
| 2 | Digita el título, el monto, selecciona la fecha, opcionalmente agrega una descripción, elige manualmente al pagador y marca los participantes implicados. | Permite la inserción de datos y mantiene marcadas las casillas de los participantes. |
| 3 | Selecciona el botón "Guardar gasto". | Valida las restricciones, almacena el gasto en la base de datos, actualiza los balances de la salida y redirige a la vista principal de la salida. |

**Post-condición:** El gasto queda registrado y el balance neto de la salida se actualiza en pantalla.

### Flujo alternativo 1 — Monto inválido

| Paso | Actor | Sistema |
|------|-------|---------|
| 1 | Ingresa un número negativo o un valor que supera los 7 dígitos en el campo de monto. | El input restringe o detecta el formato erróneo. |
| 2 | Selecciona el botón "Guardar gasto". | Detiene el envío, resalta el campo de monto en rojo y muestra el mensaje: "Monto inválido. Debe ser un número positivo de hasta 7 dígitos". |

**Post-condición:** El gasto no se registra y el usuario permanece en el formulario para corregir el valor.

### Historial de versiones

| Versión | Fecha | Cambio |
|---------|-------|--------|
| 1.0 | 20/07/2026 | Creación de Historia de Usuario |
| 1.1 | 23/07/2026 | Corrección terminológica: "miembro" → "integrante" (2 ocurrencias: resumen y CR05). Se agrega campo "Descripción" (opcional) al formulario de gasto para alinearse con F4 del MVP. |

---

## HU_CRUMBS_006 — Marcar invitados en un gasto

**Módulo:** Gestión de Gastos (Invitados)  
**Usuarios:** Registrado (Cualquier integrante dentro de la salida que registra un gasto)

### Resumen

Permitir que al momento de incluir a los participantes en un gasto, el usuario pueda marcar a uno o varios de ellos como "invitados" (mediante un switch o control visual). El beneficio es que el sistema los excluya automáticamente del cobro de ese gasto particular, distribuyendo su porción de la cuenta equitativamente entre los demás participantes activos.

### Descripción

Como integrante de una salida, quiero marcar a ciertos participantes de un gasto como invitados para que no se les cobre nada por ese concepto y su parte sea absorbida por el resto de los participantes.

### Precondiciones

- El usuario debe estar autenticado en la aplicación y en el formulario de registro de un gasto (`HU_CRUMBS_005`).
- Deben existir participantes seleccionados en la lista del gasto para poder aplicarles la condición de invitado.

### Campos de entrada

| # | Campo | Tipo | Obligatorio | Descripción |
|---|-------|------|-------------|-------------|
| 1 | Control de Invitado (`is_guest`) | Booleano (Switch / Checkbox) | No | Control visual al lado de cada participante seleccionado que activa o desactiva su estado de invitado en el gasto. |

### Criterios de aceptación

**CR01. Visualización del switch de invitado**  
- **Dado** que el usuario visualiza la lista de participantes dentro del formulario de gastos  
- **Cuando** selecciona o desmarca un participante de la lista  
- **Entonces** el sistema debe renderizar un interruptor (switch) con la etiqueta "Invitado" apagado por defecto al lado del nombre.

**CR02. Exclusión del cobro en el motor matemático**  
- **Dado** que un integrante fue seleccionado para participar en un gasto  
- **Cuando** el usuario activa su switch de "Invitado" (Estado: `is_guest = true`)  
- **Entonces** el motor matemático debe asignarle un valor a pagar de $0 de forma automática para ese gasto.

**CR03. Redistribución de la cuenta**  
- **Dado** que se ha configurado un gasto con participantes marcados como invitados  
- **Cuando** el sistema calcula las cuotas del gasto  
- **Entonces** el sistema debe dividir el monto total del gasto exclusivamente entre los participantes que mantengan el switch de invitado apagado (`is_guest = false`).

**CR04. Validación de límite crítico**  
- **Dado** que el usuario está configurando los switches de la lista de participantes del gasto  
- **Cuando** intenta activar la condición de invitado para el último participante activo de la lista  
- **Entonces** el sistema debe bloquear el switch o impedir el guardado mostrando el mensaje: "Debe haber al menos un participante que no sea invitado para dividir la cuenta".

### Dependencias

- `HU_CRUMBS_004` (Agregar integrantes) y `HU_CRUMBS_005` (Registrar gasto).

### Supuestos y restricciones

- **SP01.** Un participante puede ser un usuario registrado (por nickname) o un invitado fantasma (por nombre); ambos pueden ser marcados con el switch de invitado dentro de un gasto.

### Historias relacionadas

- `HU_CRUMBS_007` (División equitativa y manual — F6).

### Criterios de terminación

El gasto se guarda registrando internamente qué participantes fueron invitados, y se refleja correctamente la exención en el desglose del balance de ese gasto.

### Flujo normal

| Paso | Actor | Sistema |
|------|-------|---------|
| 1 | En el formulario de Registrar gasto, visualiza la lista de participantes seleccionados. | Muestra un switch de "Invitado" apagado al lado de cada nombre. |
| 2 | Activa el switch de "Invitado" en el integrante que no debe pagar (ej. el cumpleañero). | Cambia el estado visual del switch a activo e internamente marca al participante con `is_guest = true`. |

**Post-condición:** El gasto queda registrado con el participante marcado como invitado y su saldo asignado en $0.

### Flujo alternativo 1 — Todos marcados como invitados

| Paso | Actor | Sistema |
|------|-------|---------|
| 1 | Intenta activar el switch de "Invitado" para todos los participantes seleccionados en la lista. | Detecta que no quedarán integrantes disponibles para absorber la deuda. |
| 2 | Intenta presionar el botón "Guardar gasto". | Detiene el proceso y muestra: "Debe haber al menos un participante que no sea invitado para dividir la cuenta". |

**Post-condición:** El gasto no se guarda hasta que se asigne al menos un participante responsable del pago.

### Historial de versiones

| Versión | Fecha | Cambio |
|---------|-------|--------|
| 1.0 | 20/07/2026 | Creación de Historia de Usuario |
| 1.1 | 23/07/2026 | Corrección terminológica: "miembro" → "participante" (2 ocurrencias en CR01 y CR03, contexto de gasto). |

---

## HU_CRUMBS_007 — Métodos de división de gastos

**Módulo:** Gestión de Gastos (Motor de División)  
**Usuarios:** Registrado (Cualquier integrante dentro de la salida que registra un gasto)

### Resumen

Permitir que el usuario elija cómo se va a repartir el dinero de un gasto entre los participantes seleccionados, ofreciendo una opción equitativa (por partes iguales) y una opción manual (digitando montos fijos en pesos). El beneficio es ofrecer flexibilidad para ajustar las cuentas según el presupuesto o consumo real de cada integrante.

### Descripción

Como integrante de una salida, quiero elegir entre un método de división equitativo o manual al registrar un gasto para repartir el costo de la forma más justa entre los participantes.

### Precondiciones

- El usuario debe estar autenticado y en el formulario de registro de un gasto (`HU_CRUMBS_005`).

### Campos de entrada

| # | Campo | Tipo | Longitud | Obligatorio | Descripción |
|---|-------|------|----------|-------------|-------------|
| 1 | Método de división | Selección única | N/A | Sí | Selector para elegir entre el método "Equitativo" o "Manual". |
| 2 | Monto manual por integrante | Numérico | 7 | Sí (Opción Manual) | Cuadro de texto numérico al lado de cada participante para digitar su saldo a mano. |

### Criterios de aceptación

**CR01. Selección del método de división**  
- **Dado** que el usuario está editando o creando un gasto  
- **Cuando** observa la sección del tipo de reparto  
- **Entonces** el sistema debe proveer controles visuales específicos ("Equitativo" y "Manual") teniendo la opción equitativa seleccionada por defecto.

**CR02. Cálculo del método equitativo y redondeo**  
- **Dado** que el método "Equitativo" se encuentra seleccionado  
- **Cuando** el sistema procesa la división y el resultado arroja un residuo decimal  
- **Entonces** cada cuota se debe redondear al peso entero y el remanente sobrante se debe sumar al saldo del pagador del gasto.

**CR03. Habilitación de montos manuales**  
- **Dado** que el usuario se encuentra revisando la lista de participantes del gasto  
- **Cuando** cambia el selector de método hacia la opción "Manual"  
- **Entonces** el sistema debe transformar la lista habilitando un campo numérico editable al lado de cada participante (excepto para los invitados, que permanecerán bloqueados en $0).

**CR04. Validación de cuadre exacto (Manual)**  
- **Dado** que el usuario digitó valores en los campos individuales del método manual  
- **Cuando** presiona el botón "Guardar gasto" y la suma de esos inputs no es idéntica al monto total del gasto  
- **Entonces** el sistema debe rechazar el guardado y mostrar el error: "La suma de los valores manuales debe ser exactamente igual al total del gasto".

### Dependencias

- `HU_CRUMBS_005` (Registrar gasto) y `HU_CRUMBS_006` (Marcar invitados).

### Supuestos y restricciones

- **SP01.** Las validaciones matemáticas de cuadre de caja (método manual) y el cálculo de residuos (método equitativo) se ejecutan dinámicamente en el cliente y se revalidan obligatoriamente en el servidor antes de guardar.

### Historias relacionadas

- `HU_CRUMBS_008` (Balances de la salida — F7).

### Criterios de terminación

El gasto se guarda en la base de datos registrando el método seleccionado y la cuota exacta asignada a cada participación del gasto.

### Flujo normal — División equitativa

| Paso | Actor | Sistema |
|------|-------|---------|
| 1 | En el formulario de Registrar gasto, mantiene el selector en "Equitativo" (por defecto). | Calcula automáticamente la cuota por participante. |
| 2 | Presiona el botón "Guardar gasto". | Valida, aplica redondeo (residuo al pagador), guarda el registro y actualiza las cuentas de la salida. |

**Post-condición:** El gasto se almacena distribuyendo la deuda equitativamente.

### Flujo normal — División manual

| Paso | Actor | Sistema |
|------|-------|---------|
| 1 | Cambia el selector al método "Manual". | Oculta el cálculo automático y habilita los cuadros de texto numéricos para cada participante. |
| 2 | Digita a mano cuánto dinero le corresponde a cada integrante asegurando que la suma cuadre con el total del gasto. | Muestra de forma dinámica un indicador de la suma acumulada para que el usuario verifique si coincide con el total. |
| 3 | Presiona el botón "Guardar gasto". | Valida que la suma cierre a la perfección, guarda el registro y actualiza las cuentas de la salida. |

**Post-condición:** El gasto se almacena con los valores fijos asignados manualmente.

### Flujo alternativo — Suma manual no cuadra

| Paso | Actor | Sistema |
|------|-------|---------|
| 1 | Introduce valores cuya suma es mayor o menor al total del gasto. | Detecta el descuadre matemático inmediatamente. |
| 2 | Presiona el botón "Guardar gasto". | Detiene el envío del formulario, resalta los campos afectados y muestra: "La suma de los valores manuales debe ser exactamente igual al total del gasto". |

**Post-condición:** El gasto no se almacena y el usuario permanece en la pantalla para corregir los montos.

### Historial de versiones

| Versión | Fecha | Cambio |
|---------|-------|--------|
| 1.0 | 20/07/2026 | Creación de Historia de Usuario |

---

## HU_CRUMBS_008 — Visualización de balances de la salida

**Módulo:** Gestión de Saldos y Balances  
**Usuarios:** Registrado (Cualquier integrante dentro de la salida)

### Resumen

Permitir que los integrantes de una salida consulten de forma clara y transparente el estado de sus cuentas, tanto el saldo específico por cada gasto como el balance consolidado neto de todo el plan. El beneficio es que cada persona sepa exactamente cuánto dinero debe o cuánto le deben, evitando errores de cálculo manuales.

### Descripción

Como integrante de una salida, quiero visualizar el resumen de saldos por gasto y el consolidado general de la salida para conocer con precisión mi estado de cuenta neto (si debo o me deben dinero).

### Precondiciones

- El usuario debe estar autenticado en la aplicación.
- El usuario debe encontrarse dentro de la vista de una salida específica.

### Campos de salida

| # | Campo | Tipo | Descripción |
|---|-------|------|-------------|
| 1 | Detalle por Gasto | Texto / Numérico | Desglose individual de cada gasto con su título, monto total y la cuota correspondiente a cada participante. |
| 2 | Saldo Neto Consolidado | Numérico (7 dígitos) | Resultado final acumulado de la cuenta de cada persona en la salida entera. |
| 3 | Indicador de Estado | Texto (Visual) | Etiqueta o color que diferencia si el saldo de la persona es a favor ("Le deben") o en contra ("Debe"). |

### Criterios de aceptación

**CR01. Despliegue del saldo consolidado**  
- **Dado** que un integrante ingresa a revisar el estado financiero de su plan  
- **Cuando** se carga la pestaña o sección de "Balances"  
- **Entonces** el sistema debe aplicar la fórmula `(Total adelantado - Total correspondiente)` y mostrar en pantalla el saldo neto consolidado para cada integrante.

**CR02. Diferenciación visual de estados de cuenta**  
- **Dado** que el sistema renderiza la lista de balances de los integrantes  
- **Cuando** un saldo neto arroja un valor matemático positivo o negativo  
- **Entonces** el sistema debe aplicar formato visual verde bajo el texto "Le deben" si es positivo, o formato visual rojo bajo el texto "Debe" si es negativo.

**CR03. Consulta de desglose por gasto**  
- **Dado** que el usuario revisa el historial cronológico de gastos de la salida  
- **Cuando** hace clic sobre un registro de gasto en específico  
- **Entonces** la interfaz debe expandir un detalle indicando el monto, la fecha, quién pagó y la cuota exacta calculada por participante.

**CR04. Restricción de acceso a opciones avanzadas**  
- **Dado** que un integrante se encuentra examinando el balance de un gasto individual  
- **Cuando** intenta acceder a los controles avanzados de gestión de ese gasto sin ser la persona registrada como el pagador real del mismo  
- **Entonces** el sistema debe ocultar o deshabilitar dichas opciones, permitiéndole únicamente una vista de lectura general.

### Dependencias

- `HU_CRUMBS_005` (Registrar gasto) y `HU_CRUMBS_007` (Métodos de división).

### Supuestos y restricciones

- **SP01.** El sistema realiza los cálculos dinámicamente en tiempo de ejecución sumando todos los adelantos de un usuario y restando sus cuotas de participación de toda la salida.

### Historias relacionadas

- `HU_CRUMBS_009` (Registro de pagos — F8).

### Criterios de terminación

El usuario puede visualizar de forma correcta la lista de deudas netas de la salida entera y el historial de gastos con sus desgloses precisos.

### Flujo normal

| Paso | Actor | Sistema |
|------|-------|---------|
| 1 | Se ubica en la pestaña o sección de "Balances" dentro de la salida activa. | Consulta la base de datos, ejecuta el motor matemático y despliega la lista consolidada de quién debe / le deben. |
| 2 | Selecciona un gasto en particular de la lista cronológica. | Despliega un panel con el título, monto total, fecha, pagador y la asignación exacta de montos por integrante. |

**Post-condición:** El usuario visualiza de forma transparente el estado neto de todas las cuentas de la salida.

### Historial de versiones

| Versión | Fecha | Cambio |
|---------|-------|--------|
| 1.0 | 20/07/2026 | Creación de Historia de Usuario |
| 1.1 | 23/07/2026 | Corrección terminológica: "miembro" → "participante" (cuota de gasto) e "integrante" (persona en salida). |

---

## HU_CRUMBS_009 — Registro y confirmación de pagos

**Módulo:** Gestión de Pagos y Liquidaciones  
**Usuarios:** Registrado (Deudor y Pagador del gasto)

### Resumen

Permitir que un integrante que debe dinero registre un pago hacia el integrante al que le adeuda (pudiendo abonar manualmente un monto fijo o seleccionar el valor total por defecto). Este pago quedará en estado "Pendiente" hasta que el usuario que adelantó el dinero confirme que lo recibió, pasando entonces a estado "Pagado". El beneficio es llevar un control riguroso de los abonos reales sin mover dinero real dentro de la aplicación.

### Descripción

Como integrante que debe dinero en una salida, quiero registrar un abono parcial o total hacia la persona que pagó el gasto para informarle que realicé la transferencia; y como pagador de un gasto, quiero confirmar la recepción de ese dinero para saldar la cuenta en el sistema.

### Precondiciones

- El usuario deudor y el usuario pagador deben estar autenticados en el sistema.
- El integrante que registra el pago debe tener un saldo negativo (deuda) activo en la salida o gasto consultado.

### Campos de entrada

| # | Campo | Tipo | Longitud | Obligatorio | Descripción |
|---|-------|------|----------|-------------|-------------|
| 1 | Tipo de pago | Selección única | N/A | Sí | Selector para elegir entre "Monto por defecto (Total)" o "Abono manual". |
| 2 | Monto a pagar | Numérico | 7 dígitos | Sí (Opción Manual) | Cuadro de texto para digitar a mano la cantidad exacta de dinero que se va a abonar. |
| 3 | Acción de Confirmación | Botón de acción | N/A | Sí (Solo Pagador) | Control exclusivo para que el pagador cambie el estado de la transacción. |

### Campos de salida

| # | Campo | Tipo | Descripción |
|---|-------|------|-------------|
| 1 | Estado del pago | Texto (Visual) | Indicador visual que muestra si el pago está "Pendiente" o "Pagado". |

### Criterios de aceptación

**CR01. Modalidades de registro de pago (Deudor)**  
- **Dado** que un deudor inicia el reporte de una devolución de dinero  
- **Cuando** interactúa con el formulario de registro de pagos  
- **Entonces** la aplicación debe permitirle alternar entre "Monto por defecto" (que bloquea el input cargando el total adeudado) y "Abono manual" (que limpia el input para escritura libre).

**CR02. Validación del monto manual**  
- **Dado** que el usuario activó la opción de abono manual  
- **Cuando** ingresa una cifra mayor al saldo neto de su deuda total e intenta enviar el reporte  
- **Entonces** el sistema debe congelar la operación, resaltar el input en rojo y advertir que el abono no puede superar la deuda actual.

**CR03. Estado inicial del pago**  
- **Dado** que el deudor completa el formulario de pago con un monto válido  
- **Cuando** presiona el botón "Reportar pago"  
- **Entonces** la transacción debe registrarse en la base de datos con el estado inicial de "Pendiente".

**CR04. Notificación y visualización para el Pagador**  
- **Dado** que un pago en estado "Pendiente" ha sido asociado a un gasto  
- **Cuando** el pagador original de ese gasto inicia sesión e ingresa a su panel de balances  
- **Entonces** el sistema debe mostrarle el pago reportado junto con el botón exclusivo para "Confirmar recepción".

**CR05. Cierre de saldo (Confirmación)**  
- **Dado** que un pago se encuentra listado como "Pendiente"  
- **Cuando** el pagador presiona el botón de confirmación de recepción  
- **Entonces** el sistema debe actualizar el estado de la transacción a "Pagado", restar el dinero de los saldos netos globales y marcar la cuenta como saldada.

### Dependencias

- `HU_CRUMBS_005` (Registrar gasto) y `HU_CRUMBS_008` (Visualización de balances).

### Supuestos y restricciones

- **RS01.** Crumbs es una aplicación exclusivamente de registro y seguimiento; no integra pasarelas de pago reales (Stripe, PayPal, etc.) ni realiza transferencias bancarias de dinero real.

### Criterios de terminación

El flujo se completa cuando el deudor reporta su pago y el pagador presiona el botón de confirmación, lo que actualiza de inmediato el balance neto de la salida a cero o resta el abono parcial correspondiente.

### Flujo normal

| Paso | Actor | Sistema |
|------|-------|---------|
| 1 | El Deudor ingresa a los balances del gasto, selecciona "Registrar Pago" y mantiene la opción "Por defecto". | Muestra el valor exacto de la deuda total y habilita el botón de envío. |
| 2 | El Deudor presiona el botón "Reportar pago". | Almacena la transacción con el estado "Pendiente" y alerta visualmente al pagador. |
| 3 | El Pagador ingresa a su vista de saldos, localiza el pago recibido y selecciona "Confirmar recepción". | Cambia el estado a "Pagado", recalcula los saldos netos en la base de datos y actualiza las pantallas de ambos. |

**Post-condición:** La cuenta queda oficialmente saldada y el balance neto se actualiza en la base de datos.

### Flujo alternativo 1 — Abono manual mayor a la deuda

| Paso | Actor | Sistema |
|------|-------|---------|
| 1 | El Deudor selecciona "Abono manual" y digita una cantidad que supera el valor de su deuda actual. | Compara dinámicamente el valor ingresado contra el saldo deudor. |
| 2 | Presiona el botón "Reportar pago". | Detiene el envío, resalta el campo en rojo y muestra: "El monto del abono no puede ser mayor a tu deuda actual". |

**Post-condición:** No se genera el registro del pago y el usuario permanece en el formulario para ajustar el monto.

### Historial de versiones

| Versión | Fecha | Cambio |
|---------|-------|--------|
| 1.0 | 20/07/2026 | Creación de Historia de Usuario |
| 1.1 | 23/07/2026 | Corrección terminológica: "miembro" → "integrante" (persona de la salida a quien se adeuda). |

---

## HU_CRUMBS_010 — Agregar amigos (Sin solicitudes)

**Módulo:** Amigos y Grupos Favoritos (Stretch)  
**Usuarios:** Registrado

### Resumen

Permitir que un usuario agregue a otros usuarios registrados a su lista de amigos de forma inmediata y auto-aceptada (sin pasar por bandejas de aprobación ni solicitudes pendientes). Esto se puede hacer seleccionando personas de la lista de "sugeridos desde salidas" previas o buscando directamente por su nickname exacto. El beneficio es agilizar el armado de futuras salidas al reutilizar personas recurrentes con un solo tap.

### Descripción

Como usuario registrado de la aplicación, quiero agregar a otros usuarios a mi lista de amigos mediante sugerencias de salidas pasadas o buscando su nickname para poder seleccionarlos rápidamente en mis próximos gastos.

### Precondiciones

- El usuario debe estar autenticado en la aplicación.
- Para agregar por búsqueda, se debe conocer el nickname exacto del otro usuario.
- Para la opción de sugeridos, el usuario debe haber compartido al menos una salida previa con la persona.

### Campos de entrada

| # | Campo | Tipo | Longitud | Obligatorio | Descripción |
|---|-------|------|----------|-------------|-------------|
| 1 | Buscador de amigos | Alfanumérico | 30 | Sí (Opción Búsqueda) | Campo de texto para digitar el nickname exacto del usuario que se desea añadir. |
| 2 | Selección de sugerido | Botón de acción | N/A | Sí (Opción Sugeridos) | Botón "Agregar" al lado del nombre de un usuario propuesto al vuelo por el sistema. |

### Datos almacenados (modelo de datos)

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `status` | Texto | Estado de la relación. En el MVP siempre se almacena como `accepted`. |
| `source` | Texto | Origen de la amistad: `code` (búsqueda por nickname) o `sugerido_salida`. |
| `requesterId` | ID / UUID | Identificador del usuario que realiza la acción de agregar. |
| `friendId` | ID / UUID | Identificador del amigo que fue agregado. |

### Criterios de aceptación

**CR01. Amistad mutua y auto-aceptada**  
- **Dado** que el usuario interactúa con la interfaz del módulo de amigos  
- **Cuando** presiona el botón "Agregar" sobre cualquier usuario  
- **Entonces** la relación debe guardarse directamente en la base de datos con el campo `status` fijado como `accepted` de forma automática e inmediata, sin pasar por filtros de aprobación.

**CR02. Listado dinámico de sugeridos**  
- **Dado** que el usuario abre la sección de amigos  
- **Cuando** la pantalla solicita los datos de sugerencias al vuelo  
- **Entonces** el sistema debe buscar y listar a los usuarios registrados con quienes ha compartido salidas previas y que aún no posee en su red de amigos.

**CR03. Búsqueda exacta por Nickname**  
- **Dado** que el usuario utiliza la barra de búsqueda del módulo de amigos  
- **Cuando** digita un nickname que no coincide exactamente con ningún usuario registrado e inicia la búsqueda  
- **Entonces** el sistema debe arrojar un estado vacío y mostrar el mensaje: "El nickname ingresado no corresponde a ningún usuario registrado".

**CR06. Trazabilidad del origen**  
- **Dado** que se confirma la creación exitosa de un lazo de amistad  
- **Cuando** el backend genera el nuevo registro en la base de datos  
- **Entonces** debe inyectar obligatoriamente en la columna `source` el valor `code` (si vino de búsqueda) o `sugerido_salida` (si provino del bloque de sugerencias).

### Dependencias

- `HU_CRUMBS_002` (Registro de usuario — para la existencia del nickname).
- `HU_CRUMBS_004` (Agregar integrantes — para el historial de salidas compartidas).

### Supuestos y restricciones

- **SP01.** El modelo de datos conserva de forma obligatoria la dirección de quién agregó a quién (`requesterId` y `friendId`) y el estado para permitir que la aplicación evolucione en el futuro hacia un sistema con solicitudes pendientes (Opción B) sin necesidad de realizar migraciones o reescribir la arquitectura.

### Historias relacionadas

- `HU_CRUMBS_011` (Grupos favoritos).

### Criterios de terminación

El amigo seleccionado aparece reflejado de forma inmediata en la lista de amigos del usuario y queda disponible para su uso en la interfaz.

### Flujo normal — Opción A: Desde sugeridos de salidas

| Paso | Actor | Sistema |
|------|-------|---------|
| 1 | Ingresa al módulo de "Amigos" y visualiza la sección de "Personas sugeridas". | Presenta la lista de personas con salidas compartidas previas que aún no son amigos. |
| 2 | Selecciona el botón "Agregar" al lado del nombre sugerido. | Guarda el registro con `status: 'accepted'` y `source: 'sugerido_salida'`, mueve al usuario a la lista de amigos activos y actualiza la vista. |

**Post-condición:** El usuario sugerido se convierte en amigo activo al instante.

### Flujo normal — Opción B: Por búsqueda de nickname

| Paso | Actor | Sistema |
|------|-------|---------|
| 1 | En el buscador del módulo de amigos, digita el nickname exacto de un usuario. | Habilita el botón de búsqueda. |
| 2 | Selecciona el botón de buscar y luego presiona "Agregar amigo". | Valida la existencia, guarda el registro con `status: 'accepted'` y `source: 'code'`, y lo añade a su lista. |

**Post-condición:** El usuario buscado se convierte en amigo activo al instante.

### Flujo alternativo 1 — Nickname no existe

| Paso | Actor | Sistema |
|------|-------|---------|
| 1 | Ingresa un nickname erróneo o que no pertenece a ningún usuario registrado. | Al procesar la búsqueda exacta, el backend devuelve un resultado vacío. |
| 2 | Selecciona el botón de buscar o agregar. | Detiene la acción, resalta el campo en rojo y muestra: "El nickname ingresado no corresponde a ningún usuario registrado". |

**Post-condición:** No se crea ninguna relación de amistad y el usuario permanece en la pantalla de búsqueda.

### Historial de versiones

| Versión | Fecha | Cambio |
|---------|-------|--------|
| 1.0 | 20/07/2026 | Creación de Historia de Usuario |

---

## HU_CRUMBS_011 — Crear y utilizar grupos favoritos

**Módulo:** Amigos y Grupos Favoritos (Stretch)  
**Usuarios:** Registrado

### Resumen

Permitir que un usuario cree listas personalizadas con nombre (ej. "Roommates", "Los del fútbol") conformadas por los amigos de su red. Una vez creado el grupo, el usuario podrá insertarlo con un solo tap al configurar una nueva salida o un gasto, sumando a todos los integrantes de golpe. El beneficio es ahorrar tiempo y evitar la selección manual repetitiva de las personas con las que se sale seguido.

### Descripción

Como usuario registrado de la aplicación, quiero crear grupos favoritos con mis amigos recurrentes para poder agregarlos a todos juntos con un solo tap cuando configure una salida o un gasto.

### Precondiciones

- El usuario debe estar autenticado en la aplicación.
- El usuario debe tener amigos agregados previamente en su lista de amigos activos para poder sumarlos al grupo.

### Campos de entrada

| # | Campo | Tipo | Longitud | Obligatorio | Descripción |
|---|-------|------|----------|-------------|-------------|
| 1 | Nombre del grupo favorito | Alfanumérico | 20 | Sí | Título identificador de la lista (ej. "Roommates"). |
| 2 | Selección de amigos | Selección múltiple (Checkboxes) | N/A | Sí | Listado de amigos activos del usuario para marcar quiénes forman parte del grupo. |
| 3 | Tap de inserción masiva | Botón de acción | N/A | Sí (Al usarlo) | Botón "Agregar grupo favorito" dentro de la creación de salidas o gastos. |

### Criterios de aceptación

**CR01. Validación de campos obligatorios en la creación**  
- **Dado** que el usuario se encuentra configurando un nuevo grupo favorito  
- **Cuando** intenta guardar la lista omitiendo el nombre o dejando la selección de amigos vacía  
- **Entonces** el sistema debe impedir el almacenamiento y marcar los campos con alertas visuales de error.

**CR04. Función "Un Tap" para inserción masiva**  
- **Dado** que el usuario tiene grupos favoritos configurados y guardados previamente en su cuenta  
- **Cuando** se encuentra creando una salida o gasto y presiona el botón rápido de su grupo preferido  
- **Entonces** el sistema debe inyectar y preseleccionar de forma automática a todos los amigos de ese grupo en el formulario actual en un solo instante.

### Dependencias

- `HU_CRUMBS_010` (Agregar amigos), `HU_CRUMBS_003` (Crear salida) y `HU_CRUMBS_005` (Registrar gasto).

### Supuestos y restricciones

- **SP01.** Los grupos favoritos son de propiedad exclusiva y privada del usuario que los crea. Ningún otro usuario de la aplicación puede ver ni reutilizar los grupos favoritos de otra persona.

### Historias relacionadas

- `HU_CRUMBS_010` (Agregar amigos).

### Criterios de terminación

El grupo favorito queda guardado con sus amigos asociados en la base de datos, y el botón de inserción masiva funciona de manera instantánea inyectando los participantes en los formularios de gastos o salidas.

### Flujo normal — Creación del Grupo

| Paso | Actor | Sistema |
|------|-------|---------|
| 1 | Ingresa a la sección "Mis Grupos", selecciona "Nuevo grupo", asigna un nombre y marca las casillas de los amigos que desea incluir. | Despliega la interfaz de creación, lista a sus amigos disponibles y permite su selección. |
| 2 | Presiona el botón "Guardar grupo". | Valida las entradas, almacena la entidad GrupoFavorito vinculando los amigos seleccionados y confirma el éxito del guardado. |

**Post-condición:** El grupo favorito queda creado y guardado en la cuenta del usuario.

### Flujo normal — Uso con Un Tap en Gasto o Salida

| Paso | Actor | Sistema |
|------|-------|---------|
| 1 | Estando en el formulario de Registrar gasto, presiona la opción "Agregar grupo favorito". | Despliega una lista con los grupos favoritos que el usuario tiene creados. |
| 2 | Selecciona el grupo deseado (ej. "Los del fútbol"). | Inyecta de manera automática e inmediata a todos los amigos de ese grupo en la lista de participantes del gasto, activando sus casillas correspondientes. |

**Post-condición:** Todos los integrantes del grupo favorito quedan añadidos al gasto simultáneamente.

### Flujo alternativo 1 — Nombre de grupo vacío

| Paso | Actor | Sistema |
|------|-------|---------|
| 1 | Selecciona los amigos pero deja el cuadro de texto del nombre en blanco. | Detecta la ausencia del campo obligatorio. |
| 2 | Presiona el botón "Guardar grupo". | Detiene el registro, resalta el campo de texto en rojo y muestra: "Debes asignar un nombre a tu grupo favorito". |

**Post-condición:** El grupo no se almacena y el usuario permanece en la pantalla de edición para asignarle el nombre.

### Historial de versiones

| Versión | Fecha | Cambio |
|---------|-------|--------|
| 1.0 | 20/07/2026 | Creación de Historia de Usuario |
| 1.1 | 23/07/2026 | Corrección terminológica: "miembros" → "amigos" (6 ocurrencias, contexto de grupos favoritos); "miembro" → "usuario" (1 ocurrencia, contexto de acceso a la app). |
