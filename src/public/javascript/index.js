const meal_boxes = document.querySelectorAll(".meal-box");

fetch("http://localhost:8000/dashboard/info")
    .then(response => response.json())
    .then(data => {
        data.forEach(elem => {
            meal_boxes[elem.meal - 1].innerHTML += `
            <div class="meal-item">
                <h5>${elem.name}<a class="meal-delete" href="http://localhost:8000/dashboard/delete/${elem.id}"><i class="fa-solid fa-xmark"></i></a></h5>
                <span>${(elem.kcal * elem.quantity / 100).toFixed(0)} kcal</span>
                <span>${(elem.carb * elem.quantity / 100).toFixed(2)}g</span>
                <span>${(elem.prot * elem.quantity / 100).toFixed(2)}g</span>
                <span>${(elem.fats * elem.quantity / 100).toFixed(2)}g</span>
                <span>${elem.quantity}g</span>
            </div>
            `;
        });
    });