# UD3 -- Implantación de Contenido Multimedia

## Caso Práctico 1: Análisis de Código Fuente de Audio y Vídeo

Proyecto académico desarrollado para la asignatura **Diseño de
Interfaces Web (UD3)**, centrado en el análisis técnico de la
integración de contenido multimedia en páginas web del sector
inmobiliario.

------------------------------------------------------------------------

## 📌 Objetivo del Caso Práctico

El objetivo principal del trabajo fue analizar diferentes estrategias de
integración de vídeo en entornos web reales, evaluando:

-   Métodos de carga de contenido multimedia
-   Uso de servidores propios vs. plataformas externas
-   Impacto en el rendimiento y tiempos de carga
-   Diferencias en implementación técnica (HTML, iframe, CDN, streaming
    fragmentado)
-   Implicaciones en experiencia de usuario

Durante el análisis no se encontraron ejemplos de integración
independiente de audio, por lo que el estudio se centró en contenido de
vídeo.

------------------------------------------------------------------------

## 🏢 Casos Analizados

### 1️⃣ Engel & Völkers

-   Uso de carrusel con reproducción automática
-   Carga de múltiples recursos multimedia
-   Código de estado 206 (Partial Content)
-   Formato `video/webm`
-   Uso de CDN (Cloudflare)
-   Servido desde infraestructura propia externa

**Conclusión técnica:**\
Alto control sobre el contenido multimedia, optimización mediante
fragmentación y uso de red de distribución de contenidos. Requiere mayor
infraestructura técnica.

------------------------------------------------------------------------

### 2️⃣ Joyrney Real Estate

-   Vídeo corporativo integrado en página principal
-   Requiere interacción del usuario para iniciar reproducción
-   Inserción mediante `<iframe>`
-   Contenido alojado en YouTube
-   Sin carga directa de archivos de vídeo en el servidor principal

**Conclusión técnica:**\
Delegación completa de transmisión y buffering a plataforma externa.
Simplifica implementación técnica, reduce carga propia y depende de
servicio externo.

------------------------------------------------------------------------

### 3️⃣ Unicasa

-   Vídeo activado mediante ventana emergente (pop-up)
-   Carga bajo demanda
-   Uso de enlace `<a>` con URL embed de YouTube
-   Inserción en `<iframe>` tras interacción
-   No carga inicial de recursos multimedia

**Conclusión técnica:**\
El contenido multimedia funciona como elemento secundario y opcional.
Optimiza carga inicial y mantiene foco en contenido informativo.

------------------------------------------------------------------------

## 🧠 Comparativa Técnica

El análisis permite identificar tres enfoques diferenciados:

1.  **Infraestructura propia con streaming fragmentado (CDN + Partial
    Content)**\
    Mayor control y personalización, mayor complejidad técnica.

2.  **Vídeo embebido visible mediante iframe (YouTube)**\
    Solución intermedia equilibrada entre dinamismo y simplicidad
    técnica.

3.  **Carga bajo demanda mediante pop-up**\
    Menor impacto en rendimiento inicial, menor integración visual
    directa.

------------------------------------------------------------------------

## 🎯 Conclusión General

Entre las soluciones analizadas, la integración directa de un vídeo
embebido desde una plataforma externa representa la opción más
equilibrada en un contexto profesional real, al combinar:

-   Dinamismo visual
-   Rendimiento adecuado
-   Simplicidad técnica
-   Buena experiencia de usuario

------------------------------------------------------------------------

## 🛠 Herramientas Utilizadas

-   Herramientas de desarrollo del navegador (DevTools)
-   Panel Network (análisis de recursos multimedia)
-   Panel Elements (inspección de estructura HTML)
-   Documentación MDN
-   Plataformas de aprendizaje (Mimo, Enki)

------------------------------------------------------------------------

## 📚 Referencias

-   Engel & Völkers -- https://www.engelvoelkers.com/es/en/
-   Joyrney Real Estate -- https://joyrneyrealestate.com/
-   Unicasa -- https://unicasahome.es/
-   Mozilla Developer Network (MDN) -- https://developer.mozilla.org/es/

------------------------------------------------------------------------

Proyecto realizado con fines académicos.
