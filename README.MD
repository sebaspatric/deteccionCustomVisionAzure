# Image Object Detection with Azure Custom Vision

Este proyecto utiliza la API de **Azure Custom Vision** para detectar objetos en imágenes proporcionadas por el usuario a través de una URL. El usuario puede ver las predicciones en tiempo real al pasar el mouse sobre la imagen, y se mostrará un recuadro sobre las áreas donde se detectaron objetos.

## Funcionalidad

1. El usuario ingresa la URL de una imagen en el formulario.
2. La imagen se carga y se muestra en la página.
3. La API de Azure Custom Vision realiza una detección de objetos en la imagen.
4. Se muestran las predicciones con las etiquetas y probabilidades asociadas.
5. El usuario puede ver detalles adicionales al pasar el mouse sobre las predicciones, con un recuadro dibujado sobre el área detectada.

## Tecnologías utilizadas

- **HTML**: Para la estructura básica de la página.
- **CSS**: Para la presentación y estilo de la página.
- **JavaScript**: Para manejar la lógica de la interfaz y las interacciones con la API.
- **Azure Custom Vision API**: Para la detección de objetos en las imágenes proporcionadas.
- **Canvas HTML5**: Para dibujar recuadros sobre las áreas de las predicciones en la imagen.

## Instrucciones de instalación

1. Clona este repositorio en tu máquina local.

    ```bash
    git clone <URL_DEL_REPOSITORIO>
    ```

2. Abre el archivo `index.html` en tu navegador o sirve el proyecto con un servidor local (puedes usar servidores como [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) en Visual Studio Code).

## Configuración

Este proyecto requiere una **clave de API** para acceder a Azure Custom Vision. Sigue estos pasos para obtenerla:

1. Dirígete a [Azure Portal](https://portal.azure.com/).
2. Crea una **Custom Vision Resource** en el portal de Azure.
3. Obtén la **Prediction Key** y el **Prediction URL** de tu recurso.

### Agregar la clave y el endpoint

Reemplaza las siguientes variables en el código con tu **Prediction Key** y **Prediction URL**:

```javascript
const PREDICTION_URL = "tu_url_de_endpoint";
const PREDICTION_KEY = "tu_clave_de_prediccion";
```

https://sebaspatric.github.io/deteccionCustomVisionAzure/