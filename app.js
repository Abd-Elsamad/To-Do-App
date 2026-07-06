// الإمساك بحقل إدخال المهمة
let taskInput = document.querySelector(".task-input");

// الإمساك بزر الإضافة
let addBtn = document.querySelector(".add-btn");

// الإمساك بحاوية المهام
let tasksContainer = document.querySelector(".tasks");

// إنشاء Array لتخزين المهام
let tasks = [];


// قراءة المهام المحفوظة من localStorage
let savedTasks = localStorage.getItem("tasks");

// التأكد من وجود بيانات محفوظة
if (savedTasks) {

    // تحويل النص المحفوظ إلى Array
    tasks = JSON.parse(savedTasks);

}


// Function مسؤولة عن إنشاء المهمة كاملة
function createTask(taskText) {

    // إنشاء عنصر المهمة
    let taskElement = document.createElement("div");

    // إضافة class للمهمة
    taskElement.classList.add("task");

    // إنشاء عنصر للنص
    let taskTextElement = document.createElement("span");

    // وضع نص المهمة داخل الـ span
    taskTextElement.textContent = taskText;

    // إنشاء زر الحذف
    let deleteBtn = document.createElement("button");

    // كتابة كلمة Delete على الزر
    deleteBtn.textContent = "Delete";

    // إضافة النص داخل المهمة
    taskElement.appendChild(taskTextElement);

    // إضافة زر الحذف داخل المهمة
    taskElement.appendChild(deleteBtn);

    // إضافة المهمة داخل الصفحة
    tasksContainer.appendChild(taskElement);

}


// عرض المهام المحفوظة بعد Refresh
tasks.forEach(function(task) {

    // إنشاء المهمة
    createTask(task);

});


// الاستماع لأي Click داخل حاوية المهام
tasksContainer.addEventListener("click", function(event) {

    // التأكد أن المستخدم ضغط على زر Delete
    if (event.target.textContent === "Delete") {

        // الحصول على نص المهمة
        let taskText =
            event.target.parentElement.querySelector("span").textContent;

        // حذف المهمة من الـ Array
        tasks = tasks.filter(function(task) {

            return task !== taskText;

        });

        // تحديث localStorage بعد الحذف
        localStorage.setItem(
            "tasks",
            JSON.stringify(tasks)
        );

        // حذف المهمة من الصفحة
        event.target.parentElement.remove();
    }

});


// الاستماع لضغط المستخدم على زر Add
addBtn.addEventListener("click", function() {

    // جلب النص المكتوب داخل الـ input
    let taskText = taskInput.value;

    // التأكد أن المستخدم لم يكتب مسافات فقط
    if (taskText.trim() !== "") {

        // إنشاء المهمة داخل الصفحة
        createTask(taskText);

        // إضافة المهمة داخل الـ Array
        tasks.push(taskText);

        // حفظ الـ Array داخل localStorage
        localStorage.setItem(
            "tasks",
            JSON.stringify(tasks)
        );

        // تفريغ الـ input
        taskInput.value = "";
    }

});