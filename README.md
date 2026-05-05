# DataShield Consulting — Sitio Web

Sitio construido con **Jekyll + GitHub Pages**. No requiere servidor de pago.

---

## Estructura del proyecto

```
datashield-web/
│
├── _config.yml          ← Configuración global (título, dominio, etc.)
├── _data/               ← CONTENIDO EDITABLE (sin tocar código)
│   ├── site.yml         ← Nombre, nav, hero, footer, contacto
│   ├── stats.yml        ← Números de la barra de estadísticas
│   ├── modulos.yml      ← Módulos del servicio
│   ├── ley.yml          ← Sección Ley 21.719
│   ├── plataforma.yml   ← Features de la plataforma
│   ├── metodologia.yml  ← Etapas de la metodología
│   ├── porque.yml       ← Razones para elegir DataShield
│   └── cta.yml          ← CTA final (botón de agendar)
│
├── _includes/           ← Secciones HTML (una por sección de la página)
│   ├── nav.html
│   ├── hero.html
│   ├── stats.html
│   ├── ley.html
│   ├── modulos.html
│   ├── plataforma.html
│   ├── metodologia.html
│   ├── porque.html
│   ├── cta.html
│   └── footer.html
│
├── _layouts/
│   └── default.html     ← Plantilla base HTML (head, fonts, scripts)
│
├── assets/
│   ├── css/main.css     ← Todos los estilos
│   ├── js/main.js       ← Interacciones (scroll, animaciones)
│   └── img/             ← Imágenes y favicon
│
├── index.html           ← Página principal (ensambla los includes)
├── Gemfile              ← Dependencias Ruby (no tocar)
├── _config.yml          ← Configuración Jekyll
└── robots.txt           ← SEO
```

---

## Cómo editar contenido (SIN código)

**La carpeta `_data/` es tu panel de control.** Todos los textos, números y secciones están en archivos `.yml` — el formato es simple:

```yaml
# Ejemplo: cambiar el email de contacto
email: "nuevo@datashield.cl"

# Ejemplo: agregar un item de trust en el hero
trust_items:
  - "Diagnóstico gratuito de 60 min"
  - "Nuevo item que quieras agregar"
```

### Editar desde GitHub (más fácil)
1. Ve a tu repositorio en github.com
2. Entra a la carpeta `_data/`
3. Haz click en el archivo que quieras cambiar
4. Haz click en el ícono de lápiz ✏️
5. Edita el texto
6. Haz click en "Commit changes"
7. El sitio se actualiza automáticamente en ~2 minutos

---

## Cómo agregar un nuevo módulo

Abre `_data/modulos.yml` y copia/pega este bloque al final:

```yaml
- codigo: "M.06"
  etiqueta: "M.06"
  icono: "◈"
  tipo: "angosto"          # opciones: featured / medio / angosto / oscuro
  titulo: "Nombre del<br><em>nuevo módulo</em>"
  descripcion: >
    Descripción del módulo.
  cta: "Ver módulo →"
```

---

## Cómo publicar en GitHub Pages

### Primera vez

1. Crea una cuenta en [github.com](https://github.com) si no tienes
2. Crea un repositorio nuevo (ej: `datashield-web`)
3. Sube todos los archivos de esta carpeta al repositorio
4. Ve a Settings → Pages → Source: "Deploy from a branch" → Branch: `main`
5. GitHub publica el sitio en `https://tunombre.github.io/datashield-web/`

### Conectar tu dominio propio (datashield.cl)

1. En GitHub: Settings → Pages → Custom domain → escribe `datashield.cl`
2. En tu proveedor de dominio, agrega estos registros DNS:
   ```
   Tipo A   @   185.199.108.153
   Tipo A   @   185.199.109.153
   Tipo A   @   185.199.110.153
   Tipo A   @   185.199.111.153
   CNAME    www datashield.cl.
   ```
3. Activa "Enforce HTTPS" en GitHub Pages
4. ¡Listo! El sitio vivirá en https://datashield.cl con HTTPS gratuito

---

## Cómo correr el sitio localmente (para previsualizar cambios)

Necesitas Ruby instalado. Luego:

```bash
# Instalar dependencias (solo la primera vez)
bundle install

# Correr el servidor local
bundle exec jekyll serve

# Abrir en el navegador
http://localhost:4000
```

---

## Conectar el formulario de agendamiento

Abre `_data/cta.yml` y cambia `cta_href`:

```yaml
# Opción 1: Calendly
cta_href: "https://calendly.com/tu-usuario/diagnostico-60min"

# Opción 2: Formspree (formulario integrado en la web)
# 1. Crea cuenta en formspree.io (gratis)
# 2. Crea un form y copia el endpoint
cta_href: "https://formspree.io/f/xabcdefg"
```

---

## Seguridad

Este sitio es **estático** — no tiene base de datos ni servidor que hackear.
- HTTPS automático vía GitHub Pages
- Headers de seguridad en `_headers` y meta tags en el layout
- `security.txt` en `/.well-known/security.txt`
- Sin plugins de terceros con acceso a datos
- Sin cookies propias (solo las de Google Fonts, que puedes eliminar usando fuentes locales)

Para eliminar las cookies de Google Fonts y mejorar privacidad, descarga las fuentes y ponlas en `assets/fonts/`.

---

## Agregar nuevas páginas (blog, casos de uso, etc.)

Crea un archivo `.html` o `.md` en la raíz con front matter:

```markdown
---
layout: default
title: "Casos de éxito"
description: "Empresas que ya implementaron DataShield"
---

## Contenido de la página aquí
```

---

*Construido con ❤️ usando Jekyll + GitHub Pages — hosting gratuito, código abierto.*
