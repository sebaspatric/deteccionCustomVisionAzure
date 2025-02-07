const form = document.getElementById("predict-form");
const predictionsDiv = document.getElementById("predictions");
const imageContainer = document.getElementById("image-container");
const predictedImage = document.getElementById("predicted-image");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const tooltip = document.createElement('div');
tooltip.classList.add('tooltip');
imageContainer.appendChild(tooltip);

const PREDICTION_URL = "https://rgservice20250206-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/e10a03bc-1f3e-4481-990b-505e6997a8ab/detect/iterations/Iteration2/url";
const PREDICTION_KEY = "6cpDeuDsG84PzY9wkZApf4XUZDrczW8XsWYuBMa9SdlZ8BObgnTdJQQJ99BBACYeBjFXJ3w3AAAIACOG2QQc";
const THRESHOLD = 0.15; // Umbral de probabilidad

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    // Obtener la URL de la imagen ingresada
    const imageUrl = document.getElementById("imageUrl").value;

    if (!imageUrl) {
        alert("Por favor, ingresa una URL válida.");
        return;
    }

    // Mostrar mensaje de carga
    predictionsDiv.innerHTML = "<p>Cargando predicciones...</p>";
    imageContainer.style.display = 'none'; // Ocultar la imagen hasta que se cargue

    try {
        // Realizar solicitud a la API de Azure
        const response = await fetch(PREDICTION_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Prediction-Key": PREDICTION_KEY,
            },
            body: JSON.stringify({ Url: imageUrl })
        });

        if (!response.ok) {
            throw new Error("Error al hacer la solicitud a la API de Azure");
        }

        const data = await response.json();

        // Filtrar las predicciones por el umbral
        const predictions = data.predictions.filter(prediction => prediction.probability >= THRESHOLD);

        if (predictions.length === 0) {
            predictionsDiv.innerHTML = "<p>No se encontraron predicciones relevantes.</p>";
            return;
        }

        // Configurar el evento onload para la imagen
        predictedImage.onload = function () {
            imageContainer.style.display = 'block'; // Mostrar la imagen cargada

            // Establecer el tamaño del canvas según la imagen
            canvas.width = predictedImage.width;
            canvas.height = predictedImage.height;

            // Mostrar las predicciones
            predictionsDiv.innerHTML = predictions.map((prediction, index) => {
                return `
                    <div data-index="${index}">
                        <strong>Etiqueta:</strong> ${prediction.tagName}<br>
                        <strong>Probabilidad:</strong> ${(prediction.probability * 100).toFixed(2)}%<br>
                    </div>
                `;
            }).join('');

            // Configurar el comportamiento del tooltip y los cuadros
            imageContainer.addEventListener("mousemove", function (event) {
                const mouseX = event.offsetX;
                const mouseY = event.offsetY;

                // Limpiar el tooltip y el canvas
                tooltip.style.display = "none";
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                predictions.forEach(prediction => {
                    const { left, top, width, height } = prediction.boundingBox;

                    // Verificar si el mouse está sobre un cuadro
                    if (mouseX >= left * canvas.width && mouseX <= (left + width) * canvas.width &&
                        mouseY >= top * canvas.height && mouseY <= (top + height) * canvas.height) {
                        // Mostrar el tooltip
                        tooltip.style.display = "block";
                        tooltip.style.left = `${mouseX + 10}px`;
                        tooltip.style.top = `${mouseY + 10}px`;
                        tooltip.innerHTML = `<strong>${prediction.tagName}</strong><br>Probabilidad: ${(prediction.probability * 100).toFixed(2)}%`;

                        // Dibujar el cuadro en el canvas
                        ctx.beginPath();
                        ctx.rect(left * canvas.width, top * canvas.height, width * canvas.width, height * canvas.height);
                        ctx.lineWidth = 3;
                        ctx.strokeStyle = "red";
                        ctx.stroke();
                    }
                });
            });

            imageContainer.addEventListener("mouseleave", function () {
                tooltip.style.display = "none";
            });
        };

        // Asignar la URL de la imagen para que se cargue y dispare el evento onload
        predictedImage.src = imageUrl;

    } catch (error) {
        predictionsDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
});
