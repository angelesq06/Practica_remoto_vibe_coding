document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('lead-form');
    const statusDiv = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Estado de carga del botón
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando información...';
            statusDiv.className = 'form-status hidden';

            // Recopilación de datos
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            // Agregar campos ocultos o metadatos si fuera necesario
            data.source = window.location.href;

            try {
                // Post al Webhook de GoHighLevel actualizado
                const response = await fetch('https://services.leadconnectorhq.com/hooks/oHEjwZJStUWIGo2vbLjs/webhook-trigger/ef117074-6986-4011-bb66-295625e3b9f9', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    /* Se serializan todos los datos del formulario a string JSON */
                    body: JSON.stringify(data),
                });

                if (response.ok || response.status === 200 || response.status === 201) {
                    // UI de Éxito
                    statusDiv.innerHTML = '¡Gracias por contactarme! He recibido tu solicitud y me pondré en contacto contigo pronto para agendar nuestro café virtual.';
                    statusDiv.className = 'form-status success';
                    form.reset();
                } else {
                    throw new Error('Respuesta de red inválida');
                }
            } catch (error) {
                // UI de Error
                statusDiv.innerHTML = 'Ocurrió un error al procesar tu solicitud. Por favor, intenta nuevamente más tarde.';
                statusDiv.className = 'form-status error';
                console.error("Webhook Error:", error);
            } finally {
                // Restaurar botón
                submitBtn.disabled = false;
                submitBtn.textContent = 'Solicitar Cotización y Agendar';
            }
        });
    }
});
