const meal_boxes = document.querySelectorAll(".meal-box");

fetch("http://localhost:8000/dashboard/info")
    .then(response => response.json())
    .then(data => {
        data.forEach(elem => {
            meal_boxes[elem.meal - 1].innerHTML += `
            <div class="meal-item">
                <h5>${elem.name}<a class="meal-delete" href="http://localhost:8000/dashboard/delete/${elem.id}"><i class="fa-solid fa-xmark"></i></a></h5>
                <span>${elem.kcal} kcal</span>
                <span>${elem.carb}g</span>
                <span>${elem.prot}g</span>
                <span>${elem.fats}g</span>
                <div>
                    <input class="meal-quantity" type="number" value="${elem.quantity}">g
                </div>
            </div>
            `;
        });
    });