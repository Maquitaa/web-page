# Mi sitio web — DataShield Consulting

Hice este sitio con Jekyll y lo publico gratis en GitHub Pages. No pago servidor. El dominio (datashield.cl) sí está pagado aparte.

Si en algún momento no me acuerdo cómo funciona algo, está todo explicado aquí.

---

## Cómo está organizado

Lo importante a entender es que hay dos tipos de archivos: los que no debería tocar casi nunca (la estructura HTML, el CSS) y los que edito seguido porque tienen el contenido real del sitio.

El contenido editable está todo en la carpeta `_data/`. Cada archivo `.yml` controla una sección de la página:

```
_data/
├── site.yml         → nombre, nav, hero, footer, datos de contacto
├── stats.yml        → los números grandes (2026, 72h, etc.)
├── modulos.yml      → los módulos M.01 al M.05 + DPO
├── ley.yml          → sección de la Ley 21.719
├── plataforma.yml   → las 4 features del dashboard
├── metodologia.yml  → las 4 etapas del proceso
├── porque.yml       → los 3 principios de por qué DataShield
└── cta.yml          → el botón y texto de "agendar diagnóstico"
```

El resto de la estructura, para referencia:

```
_includes/    → cada sección de la página es un archivo HTML separado
_layouts/     → la plantilla base (head, fonts, scripts) — no tocar
assets/       → CSS, JS e imágenes
index.html    → solo ensambla los includes, no tiene contenido propio
```

---

## Cómo edito el contenido sin tocar código

Entro a github.com, busco el archivo que quiero cambiar en `_data/`, le doy al lápiz ✏️, edito y guardo con "Commit changes". En unos 2 minutos el sitio se actualiza solo.

El formato YAML es bastante legible, se entiende solo. La única regla importante es respetar la indentación (los espacios al principio de cada línea).

---

## Cómo agrego un módulo nuevo (FinOps, Ciberseguridad, etc.)

Abro `_data/modulos.yml` y pego esto al final del archivo:

```yaml
- codigo: "M.06"
  etiqueta: "M.06"
  icono: "◈"
  tipo: "angosto"       # opciones: featured / medio / angosto / oscuro
  titulo: "Nombre<br><em>del módulo</em>"
  descripcion: >
    Descripción del módulo.
  cta: "Ver módulo →"
```

El sitio lo muestra automático, no hay que tocar HTML.

---

## Cómo ver el sitio en local antes de publicar

Necesito tener Ruby instalado (RubyInstaller for Windows, la versión WITH DEVKIT). Una vez instalado:

```bash
# Primera vez — instala las dependencias
bundle install

# Cada vez que quiero ver el sitio
bundle exec jekyll serve
```

Luego abro `http://localhost:4000` en el navegador. Cualquier cambio que haga en los archivos se refleja solo, sin tener que reiniciar nada.

---

## Cómo conectar el dominio datashield.cl

En GitHub: Settings → Pages → Custom domain → escribo `datashield.cl`.

En el proveedor donde compré el dominio, agrego estos registros DNS:

```
A    @    185.199.108.153
A    @    185.199.109.153
A    @    185.199.110.153
A    @    185.199.111.153
CNAME    www    datashield.cl.
```

Activo "Enforce HTTPS" y listo. El certificado SSL lo genera GitHub automáticamente, no cuesta nada.

---

## Cómo conectar el formulario de contacto

En `_data/cta.yml` cambio la línea `cta_href` por mi link de Calendly o por un formulario de Formspree (también gratis):

```yaml
# Con Calendly:
cta_href: "https://calendly.com/mi-usuario/diagnostico"

# Con Formspree (formulario embebido):
cta_href: "https://formspree.io/f/mi-codigo"
```

---

## Por qué no me van a hackear

El sitio es estático — no hay base de datos, no hay servidor corriendo código, no hay login de admin. Lo que ven los visitantes es exactamente lo que está en los archivos HTML. No hay nada que atacar. GitHub maneja el HTTPS automático.

Lo único que tengo que cuidar es la contraseña de mi cuenta de GitHub.

---

## Cómo trabajar desde otro computador

1. Instalo GitHub Desktop
2. Inicio sesión con mi cuenta
3. `File → Clone Repository` → busco `web-page` → Clone
4. Ya tengo todo el proyecto local y sincronizado
