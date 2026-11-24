# Certificados y portadas (`certificates/`)

Todo archivo guardado en esta carpeta queda **público** en GitHub Pages. Antes de subir un PDF o imagen, verifica que **no muestre número de cédula, teléfono, dirección, correo personal ni códigos QR con datos privados** (usa tus copias `*filtro*` cuando existan, o deja solo el campo `"url"` de verificación en `data/certificates.json`).

## Cómo agregar archivos y portadas (Camino B)

1. Copia el certificado a esta carpeta con un nombre limpio en minúsculas, por ejemplo `datacamp-sql.pdf` (idealmente `< 3 MB`).
2. *(Opcional)* Agrega una portada en miniatura, por ejemplo `datacamp-sql-thumb.webp`.
   - **Tamaño recomendado:** **`1200×800 px`** (proporción exacta **`3:2`**).
   - **Formato:** **WebP** (preferido) o **JPG**.
   - **Peso objetivo:** **menos de 150 KB** para mantener la carga rápida en móvil y evitar saltos de layout (CLS = 0).
3. Mientras un certificado no tenga `thumb`, el sitio dibuja automáticamente una **portada generada 3:2** con gradiente por categoría, monograma del emisor, año y horas. Cuando agregues el `thumb` en `data/certificates.json`, la miniatura real la reemplaza en el mismo contenedor `3:2` sin mover el diseño.
4. Actualiza los campos `"file"`, `"thumb"` o `"url"` en `../data/certificates.json`.
5. Verifica todo antes de subir ejecutando desde `IsaksGir4.github.io/`:
   ```bash
   python tools/revisar_sitio.py
   ```
