# Reto de Desarrollo Web3 – Automatización de Evaluación Socioeconómica para Becas

## 1. Contexto académico

Una universidad busca **automatizar y transparentar el proceso de evaluación socioeconómica para la asignación de becas**. Actualmente, estos procesos suelen ser opacos, manuales y difíciles de auditar, lo que genera desconfianza tanto en los postulantes como en las áreas administrativas.

Para abordar este problema, la universidad decide adoptar una **arquitectura Web3**, combinando:

* **Machine Learning (ML)** para la evaluación socioeconómica.
* **Identidad Digital** para autenticar al modelo que realiza la evaluación.
* **Smart Contracts** para garantizar inmutabilidad, trazabilidad y verificabilidad de los resultados.

Este reto simula un escenario realista donde la tecnología se utiliza para **fortalecer la confianza institucional, la equidad y la rendición de cuentas**.

---

## 2. Objetivo del reto

Diseñar e implementar una **aplicación Web3** que permita:

1. Recolectar información socioeconómica de un postulante.
2. Ejecutar un modelo de ML que genere un **índice socioeconómico**.
3. Firmar criptográficamente el resultado, atribuyéndolo a una **IA con identidad digital**.
4. Registrar el resultado de forma **inmutable en blockchain** mediante un smart contract.
5. Permitir a terceros verificar:

   * La autenticidad del resultado.
   * Que fue generado por el modelo autorizado.
   * Que no ha sido alterado.

---

## 3. Alcance del desafío

Los equipos deberán implementar, como mínimo, los siguientes componentes:

### 3.1 Formulario socioeconómico

Un formulario web que recolecte:

* Información socioeconómica (según la estructura definida en el repositorio).
* Documento de identidad (DNI) del postulante.

El formulario puede ser simple, pero debe asegurar:

* Validación básica de datos.
* Asociación clara entre el DNI y la evaluación generada.

---

### 3.2 Evaluación mediante Machine Learning

El repositorio base incluye una función que **simula un modelo de ML determinístico**, utilizando TensorFlow.js, que:

* Normaliza los datos de entrada.
* Calcula un **Socioeconomic Index** (valor entre 0 y 1).
* Clasifica el resultado en niveles: `LOW`, `MEDIUM` o `HIGH`.

> Importante: el modelo **no entrena ni aprende**, su finalidad es didáctica y reproducible. En un escenario real, este modelo podría ser reemplazado por uno entrenado con datos históricos y auditado éticamente.

---

### 3.3 Identidad digital del modelo (IA)

El resultado del modelo debe:

* Estar **firmado criptográficamente**.
* Asociarse a una identidad digital que represente al modelo de ML.

Esto implica que la IA actúa como un **actor verificable**, capaz de demostrar:

* Que ella generó el resultado.
* Que el modelo no fue modificado.

La implementación de esta identidad queda a criterio del equipo (ej. claves públicas/privadas, wallets, etc.).

---

### 3.4 Registro en blockchain

El resultado firmado debe ser:

* Enviado a un **smart contract**.
* Almacenado de forma **inmutable**.

El smart contract debe permitir:

* Registrar evaluaciones socioeconómicas.
* Consultar evaluaciones por DNI (u otro identificador definido).
* Verificar la firma y la integridad de los datos almacenados.

---

### 3.5 Módulo de validación

La aplicación debe incluir una sección donde cualquier usuario pueda:

* Ingresar un DNI (u otro identificador).
* Consultar el resultado de la evaluación.
* Verificar que:

  * El resultado existe en blockchain.
  * Coincide con el modelo autorizado.
  * No ha sido alterado.

Este módulo representa el principio de **verificabilidad pública**.

---

## 4. Entregables esperados

Cada equipo deberá presentar:

1. Aplicación web.
2. Smart contract.
3. Mecanismo de firma y verificación.

## 5. Requerimientos técnicos y funcionales

5.1 Experiencia del usuario final (postulante)

El sistema debe estar diseñado de forma que los postulantes no requieran conocimientos de Web3 ni el uso de wallets.

El usuario no debe:

- Instalar extensiones de navegador (MetaMask u otras).
- Administrar claves privadas.
- Firmar transacciones manualmente.

La interacción debe asemejarse a una aplicación web tradicional:

- Completar el formulario socioeconómico.

- Enviar la información.

 - Consultar el resultado mediante DNI.

La complejidad asociada a blockchain, firmas criptográficas e identidad digital debe estar completamente abstraída en la capa de aplicación o backend.

### 5.2 Entorno de desarrollo

El proyecto debe poder ejecutarse íntegramente en entorno local (localhost).

Requisitos técnicos mínimos:

- Uso obligatorio de Hardhat v3.

- Despliegue de smart contracts en Hardhat Network (red local).

- Smart contracts escritos en Solidity.

No es necesario ni requerido el despliegue en testnets o mainnet.

### 5.3 Interacción con blockchain

Para la comunicación con los smart contracts:

- Debe utilizarse Viem como librería de interacción con la blockchain.

- Se permite el uso de cuentas preconfiguradas de Hardhat.

- La identidad digital del modelo (IA) puede implementarse mediante:

- Una cuenta controlada por la aplicación.

- Una clave privada del modelo almacenada en entorno local.

La solución debe permitir verificar que el resultado fue firmado por el modelo autorizado, y no por un usuario final.

### 5.4 Stack Web

Cada equipo es libre de elegir su tecnología web preferida basadad en Node JS instalar Bun.js en https://bun.sh/ y utilizarlo como entorno de ejecución

### 5.5 Presentación del proyecto

Durante la presentación, los equipos deberán demostrar en localhost:

- Registro de una evaluación socioeconómica.

- Firma del resultado del modelo por la identidad digital de la IA.

- Registro inmutable en blockchain.

- Verificación pública del resultado.

> Nota: 