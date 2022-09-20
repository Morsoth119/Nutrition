const meal_boxes = document.querySelectorAll(".meal-box");

fetch("http://localhost:8000/dashboard/test")
    .then(response => response.json())
    .then(data => {
        data.forEach(elem => {
            meal_boxes[elem.meal - 1].innerHTML += `
            <div class="meal-item">
                <h5>${elem.name} <button class="meal-delete"><i class="fa-solid fa-xmark"></i></button></h5>
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

// Do smthing with the await

const deleteBtns = document.querySelectorAll(".meal-delete");

deleteBtns.forEach(elem => elem.addEventListener("input", getInfo()));

async function getInfo() {
    const data = await fetch("http://localhost:8000/dashboard/test")
    .then(response => response.json())
    .then(data => console.log(data));
};

console.log(deleteBtns);