document.addEventListener("DOMContentLoaded", function() {
    const quantityInput = document.getElementById("service-quantity");
    const typeRadios = document.querySelectorAll("input[name='serviceType']");
    const optionsContainer = document.getElementById("options-container");
    const serviceOption = document.getElementById("service-option");
    const propertyContainer = document.getElementById("property-container");
    const serviceProperty = document.getElementById("service-property");
    const totalSpan = document.getElementById("service-total");
    const errorDiv = document.getElementById("error-msg-6");

    function calculate() {
        const qtyValue = quantityInput.value.trim();
        const regex = /^[1-9]\d*$/;

        if (!regex.test(qtyValue)) {
            errorDiv.textContent = "Ошибка: введите целое положительное число!";
            errorDiv.style.display = "block";
            totalSpan.textContent = "0";
            return;
        } else {
            errorDiv.style.display = "none";
        }

        const quantity = parseInt(qtyValue, 10);
        
        let basePrice = 1000;
        let selectedTypeVal = document.querySelector("input[name='serviceType']:checked").id;

        if (selectedTypeVal === "type1") {
            basePrice = 1000;
            optionsContainer.style.display = "none";
            propertyContainer.style.display = "none";
        } else if (selectedTypeVal === "type2") {
            basePrice = 2000;
            optionsContainer.style.display = "block";
            propertyContainer.style.display = "none";
        } else if (selectedTypeVal === "type3") {
            basePrice = 3000;
            optionsContainer.style.display = "none";
            propertyContainer.style.display = "block";
        }

        let extraPrice = 0;
        if (selectedTypeVal === "type2") {
            extraPrice = parseInt(serviceOption.value, 10) || 0;
        } else if (selectedTypeVal === "type3") {
            if (serviceProperty.checked) {
                extraPrice = parseInt(serviceProperty.value, 10) || 0;
            }
        }

        const total = (basePrice + extraPrice) * quantity;
        totalSpan.textContent = total;
    }

    quantityInput.addEventListener("input", calculate);
    typeRadios.forEach(radio => radio.addEventListener("change", calculate));
    serviceOption.addEventListener("change", calculate);
    serviceProperty.addEventListener("change", calculate);

    calculate();
});
