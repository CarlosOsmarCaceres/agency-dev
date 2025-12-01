# 🚀 Agencia Digital - Plataforma de Gestión Full Stack

Bienvenido a la plataforma de gestión para una Agencia de Servicios Digitales. Este proyecto es una solución integral que permite la venta de servicios, gestión de carritos de compra, administración de proyectos y seguimiento financiero.

El sistema ha sido construido siguiendo estrictamente los principios de **Clean Architecture**, **Domain-Driven Design (DDD)** y **Test Driven Development (TDD)**, asegurando un código desacoplado, testeable y escalable.

---

## 🏗️ Arquitectura del Proyecto (Monorepo)

El proyecto está estructurado en un **Monorepo** dividido en tres capas principales:

1.  **`packages/domain` (El Núcleo):**
    * Contiene la lógica de negocio pura, Entidades, Interfaces de Repositorios y Casos de Uso.
    * **No tiene dependencias** de frameworks externos (ni React, ni Express).
    * Desarrollado bajo metodología **TDD** (Vitest).

2.  **`apps/backend` (Infraestructura):**
    * API REST construida con **Node.js** y **Express**.
    * Implementa los adaptadores reales para la base de datos usando **Prisma ORM** y **PostgreSQL**.
    * Maneja la seguridad con **JWT** y **Bcrypt**.

3.  **`apps/frontend` (Presentación):**
    * SPA construida con **React**, **Vite** y **TypeScript**.
    * Estilizado con **Tailwind CSS**.
    * Implementación de **Visual TDD** utilizando **Storybook**.
    * Diseño atómico (Atoms, Molecules, Organisms).

---

## 📋 Requisitos Previos

Para ejecutar este proyecto necesitas tener instalado:

* **Docker Desktop** (Requerido para la ejecución orquestada).
* **Git**.

---

## 🚀 Guía de Inicio Rápido (Docker)

Esta es la forma recomendada de ejecutar el proyecto. Docker se encargará de levantar la base de datos, el backend y el frontend automáticamente.

### 1. Configuración de Variables de Entorno

Navega a la carpeta del backend y crea el archivo `.env`:

```bash
cd apps/backend
# Crea un archivo llamado .env y pega el siguiente contenido: