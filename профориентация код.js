{source}<style scoped="scoped" type="text/css">label {
padding: 10px;
border-radius: 0;
border: solid 1px #d3d3d3;
background: #f5f5f5;
width: calc(50% - 30px);
max-width: 100%;
cursor: pointer;
display: inline-block;
}
label:hover {
border: solid 1px lightgrey;
background: #e2e2e2;
}
input {
display: none;
}
input:checked + label {
border: solid 1px #965150;
background: #a35857;
color: white;
}
input:checked + label:hover {
background: #94504f;
}
input:disabled + label {
opacity: 0.5;
cursor: not-allowed;
}
input:disabled + label:hover {
background: #f5f5f5;
}
#quizForm {
text-align: center;
}

#quizForm > div{
   display: flex;
}

</style>
const professionTypes = [
    {"title": "Человек-техника", "url":"/index.php?option=com_content&view=article&id=8285"},
    {"title": "Человек-природа", "url":"/index.php?option=com_content&view=article&id=8284"},
    {"title": "Человек-знаковая система", "url":"/index.php?option=com_content&view=article&id=8283"},
    {"title": "Человек-человек", "url":"/index.php?option=com_content&view=article&id=8282"},
    {"title": "Человек-художественный образ", "url":"/index.php?option=com_content&view=article&id=8281"},
];
// type - тип профессии, начинается с 0.
// каждый элемент массива это "уровень" опросника.
const quizData = [
    // 1
    [
        {"type": 1, "question": "Ухаживать за животными."},
        {"type": 0, "question": "Работать с машинами, приборами; обслуживать, ремонтировать их."}
    ],
    // 2
    [
        {"type": 3, "question": "Лечить больных, помогать пожилым людям."},
        {"type": 2, "question": "Составлять таблицы, схемы, программное обеспечение."}
    ],
    // 3
    [
        {"type": 4, "question": "Оценивать качество плакатов, иллюстраций, музыкальных записей."},
        {"type": 1, "question": "Наблюдать за жизнью растений, определять их состояние."}
    ],
    // 4
    [
        {"type": 0, "question": "Обрабатывать дерево, металл, ткань и другие материалы."},
        {"type": 3, "question": "Рекламировать, продавать, распределять товары."}
    ],
    // 5
    [
        {"type": 2, "question": "Обсуждать, анализировать научно-популярные книги."},
        {"type": 4, "question": "Обсуждать, анализировать художественную литературу."}
    ],
    // 6
    [
        {"type": 1, "question": "Выхаживать молодняк (животных различных пород)."},
        {"type": 3, "question": "Обучать детей трудовым, учебным, спортивным действиям."}
    ],
    // 7
    [
        {"type": 4, "question": "Копировать рисунки, настраивать музыкальные инструменты."},
        {"type": 0, "question": "Управлять подъемным краном, трактором, тепловозом."}
    ],
    // 8
    [
        {"type": 3, "question": "Сообщать нужные сведения, давать пояснения."},
        {"type": 4, "question": "Оформлять выставки, витрины, готовить пьесы, концерты."}
    ],
    // 9
    [
        {"type": 0, "question": "Ремонтировать предметы домашнего обихода, жилище."},
        {"type": 2, "question": "Отыскивать ошибки в текстах, таблицах, графиках."}
    ],
    // 10
    [
        {"type": 1, "question": "Лечить животных."},
        {"type": 2, "question": "Выполнять вычисления, расчеты."}
    ],
    // 11
    [
        {"type": 1, "question": "Выводить новые сорта растений."},
        {"type": 0, "question": "Конструировать новые виды машин, зданий, одежды."}
    ],
    // 12
    [
        {"type": 3, "question": "Разбирать споры, улаживать ссоры, убеждать, советовать."},
        {"type": 2, "question": "Разбираться в чертежах, схемах, таблицах."}
    ],
    // 13
    [
        {"type": 4, "question": "Наблюдать, оценивать художественную самодеятельность."},
        {"type": 1, "question": "Наблюдать, изучать жизнь микроорганизмов."}
    ],
    // 14
    [
        {"type": 0, "question": "Обслуживать, налаживать медицинские приборы."},
        {"type": 3, "question": "Оказывать людям медицинскую помощь при ранениях, ушибах."}
    ],
    // 15
    [
        {"type": 2, "question": "Составлять точные описания, отчеты о явлениях, событиях."},
        {"type": 4, "question": "Красочно описывать, рассказывать, изображать события."}
    ],
    // 16
    [
        {"type": 1, "question": "Производить анализы, исследования в клинике."},
        {"type": 3, "question": "Осматривать больных, назначать лечение."}
    ],
    // 17
    [
        {"type": 4, "question": "Красить, расписывать поверхность изделий, стены."},
        {"type": 0, "question": "Осуществлять монтаж здания, приборов, сборку машин."}
    ],
    // 18
    [
        {"type": 3, "question": "Организовывать экскурсии, походы в театры, музеи."},
        {"type": 4, "question": "Играть на сцене, участвовать в спектаклях."}
    ],
    // 19
    [
        {"type": 0, "question": "Строить по чертежам, изготовлять машины."},
        {"type": 2, "question": "Чертить, рисовать, копировать карты, чертежи, схемы."}
    ],
    // 20
    [
        {"type": 1, "question": "Защищать лесные, садовые растения от вредителей."},
        {"type": 2, "question": "Работать на наборной машине, компьютере и др."}
    ],
];
function Level(index, data) {
    this.index = index;
    this.inputs = [];
    for(let i = 0; i < data.length; i++) {
        this.inputs[i] = document.createElement('input');
        this.inputs[i].name = 'level-' + index;
        this.inputs[i].type = 'radio';
        this.inputs[i].dataQuestion = data[i].question;
        this.inputs[i].dataType = data[i].type;
        this.inputs[i].dataLevel = index;
        this.inputs[i].id = 'level-' + index + '-' + i;
        if (index !== 0) {
            this.setDisabled(true);
        }
    }
}
Level.prototype.setDisabled = function(isDisabled) {
    for(let i = 0; i < this.inputs.length; i++) {
        this.inputs[i].disabled = isDisabled;
    }
}
Level.prototype.onChange = function(callback, quiz) {
    for(let i = 0; i < this.inputs.length; i++) {
        this.inputs[i].quiz = quiz;
        this.inputs[i].addEventListener('change', callback);
    }
}
Level.prototype.getDom = function() {
    let div = document.createElement('div')
    for(let i = 0; i < this.inputs.length; i++) {
        let label = document.createElement('label');
        label.setAttribute('for', 'level-' + this.index + '-' + i);
        label.innerText = this.inputs[i].dataQuestion;
        div.appendChild(this.inputs[i]);
        div.appendChild(label);
    }
    return div;
};
Level.prototype.getIndex = function() {
    return this.index;
};
Level.prototype.getType = function() {
    for(let i = 0; i < this.inputs.length; i++) {
        if (this.inputs[i].checked) {
            return this.inputs[i].dataType;
        }
    }
};
function Quiz(form, data, result) {
    this.isLastClicked = false;
    this.hasChart = false;
    this.chart;
    this.result = result;
    this.form = form;
    this.levels = []
    for(let i = 0; i < data.length; i++) {
        this.levels[i] = new Level(i, data[i]);
        this.levels[i].onChange(this.onLevelClick, this);
        form.appendChild(this.levels[i].getDom());
    }
};
Quiz.prototype.onLevelClick = function(event) {
    const quiz = event.target.quiz;
    const currentLevel = parseInt(event.target.dataLevel);
    if (currentLevel < quiz.levels.length - 1 && !quiz.isLastClicked) {
        const nextLevel = quiz.levels[currentLevel + 1];
        nextLevel.setDisabled(false);
    } else {
        quiz.isLastClicked = true;
        quiz.showResult();
    }
}
Quiz.prototype.getResult = function() {
    let result = []
    for (let i = 0; i < this.levels.length; i++) {
        result.push(this.levels[i].getType());
    }
    return result;
};
Quiz.prototype.showResult = function() {
    let answersArray = this.getResult();
    let ratios = [];
    let counts = [];

    for (let i = 0; i < this.result.length; i++) {
        for (let j = 0; j < answersArray.length; j++) {
            if (answersArray[j] === i) {
                if (counts[i] === undefined) {
                    counts[i] = 1;
                } else {
                    counts[i]++;
                }
            }
        }
    }
    ratios = counts.map(function(count) {
        return count / answersArray.length;
    });
    if (this.hasChart) {
        this.form.removeChild(this.chart.getDom());
    }
    this.chart = new Chart(this.result, ratios);
    this.form.appendChild(this.chart.getDom());
    if (!this.hasChart) {
        window.scrollBy(0, this.chart.getDom().getBoundingClientRect().top + pageYOffset - 200);
    }
    this.hasChart = true;
};
function Chart(data, ratios) {
    this.data = data;
    this.ratios = ratios;
    this.canvas = document.createElement('canvas');
    this.canvas.style.position = 'relative';
    this.canvas.height = 300;
    this.canvas.width = 600;
    this.radius = 120;
    this.colors = ["#272727",
        "#247ba0",
        "#e8613e",
        "#ffba3e",
        "#ffaf87"];
    this.canvas.colors = this.colors;
    this.ctx = this.canvas.getContext("2d");
    this.drawChart();
    this.drawLegend();
    this.canvas.addEventListener('click', this.onClick);
    this.canvas.addEventListener('mousemove', this.onMouseMove);
};
Chart.prototype.drawChart = function() {
    let startAngle = 0;
    let endAngle = 0;
    const centerX = this.canvas.height / 2;
    const centerY = this.canvas.height / 2;
    for (let i = 0; i < this.data.length; i++) {
        if (this.ratios[i] != 0) {
            let currentAngle = (2 * Math.PI * this.ratios[i])
            endAngle = startAngle + currentAngle;
            this.ctx.fillStyle = this.colors[i % this.colors.length];
            this.ctx.beginPath();
            this.ctx.moveTo(centerX, centerY);
            this.ctx.arc(centerX, // x
                centerY, // y
                this.radius, // radius
                startAngle, // start andgle
                endAngle // end angle
            );
            this.ctx.fill();
            let middleAngle = startAngle + currentAngle / 2;
            let middleRadius = this.radius * 0.7;
            // нахождение стороны треугольника по углу и двум другим сторонам
            let textX = centerX + middleRadius * Math.cos(middleAngle);
            let textY = centerY + middleRadius * Math.sin(middleAngle);
            this.ctx.strokeStyle = "#ffffff";
            this.ctx.strokeText((this.ratios[i] * 100) + "%", textX, textY);
            startAngle = endAngle;
        }
    }
};
Chart.prototype.drawLegend = function() {
    this.canvas.objects = [];
    let positionX = this.canvas.width / 2;
    let positionY = this.canvas.height - (this.radius * 2);
    this.ctx.fillStyle = "black";
    this.ctx.font = "16px sans-serif";
    this.ctx.fillText("Обработка и интерпретация результатов", positionX - 10, positionY);
    this.ctx.font = "10px sans-serif";
    positionY += 20;
    for (let i = 0; i < this.data.length; i++) {
        this.ctx.fillStyle = this.colors[i];
        this.ctx.fillRect(positionX, positionY - 10, 10, 10);
        this.ctx.fillStyle = "blue";
        this.ctx.fillText(this.data[i].title, positionX + 15, positionY);
        this.canvas.objects.push({
            x: positionX,
            y: positionY,
            width: this.canvas.width / 2,
            height: 20,
            url: this.data[i].url,
            title: this.data[i].title
        });
        // выделить области ссыылок
        // this.ctx.strokeStyle = 'black';
        // this.ctx.strokeRect(positionX, positionY - 10, this.canvas.width / 2, 20);
        positionY += 20;
    }
};
Chart.prototype.onClick = function(event) {
    const canvas = event.target;
    const boundingRect = canvas.getBoundingClientRect();
    const x = event.pageX - (boundingRect.left + pageXOffset);
    const y = event.pageY - (boundingRect.top + pageYOffset);
    canvas.objects.forEach(function (object) {
        if (y + 12 > object.y && y + 12 < object.y + object.height &&
            x > object.x && x < object.x + object.width
        ) {
            window.open(object.url, '_blank');
        }
    });
    // выделить область клика
    // canvas.getContext('2d').strokeRect(x - 5, y - 5, 10, 10);
}
Chart.prototype.onMouseMove = function(event) {
    const canvas = event.target;
    const ctx = canvas.getContext('2d');
    const boundingRect = canvas.getBoundingClientRect();
    const x = event.pageX - (boundingRect.left + pageXOffset);
    const y = event.pageY - (boundingRect.top + pageYOffset);
    let stopCursorRepaint = false;
    for (let i = 0; i < canvas.objects.length; i++) {
        let object = canvas.objects[i];
        let isOver = y + 12 > object.y && y + 12 < object.y + object.height &&
            x > object.x && x < object.x + object.width;
        if (isOver) {
            ctx.fillStyle = "#f4f4f4";
            ctx.fillRect(object.x - 2, object.y - 12, canvas.width / 2, object.height + 2);
            stopCursorRepaint = true
        } else {
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(object.x - 2, object.y - 12, canvas.width / 2, object.height + 2)
        }
        ctx.fillStyle = canvas.colors[i];
        ctx.fillRect(object.x, object.y - 10, 10, 10);
        ctx.fillStyle = "blue";
        ctx.fillText(object.title, object.x + 15, object.y);
        if (stopCursorRepaint) {
            canvas.style.cursor = "pointer";
        } else {
            canvas.style.cursor = "auto";
        }
    };
};
Chart.prototype.getDom = function() {
    return this.canvas;
};
window.addEventListener('load', function() {
    const form = document.getElementById('quizForm');
    new Quiz(form, quizData, professionTypes);
});
function testQuiz() {
    const form = document.getElementById('quizForm');
    const inputs = form.getElementsByTagName('input');
    for (let i = 0; i < inputs.length; i += 2) {
        inputs[i].dispatchEvent(new Event('change'));
        inputs[i].checked = true;
    }
}
<p><b>Инструкция:</b> «Предположим, что после окончания школы вы сможете выполнять любую работу. Но если бы вам пришлось выбирать только из двух, какую бы вы предпочли?»</p>
<div id="quizForm">&nbsp;</div>
<p>&nbsp;</p>
<p style="color: #962222;">Обращаем Ваше внимание на то, что экспресс-диагностика позволяет выявить лишь общую направленность профессиональных интересов. Подробную информацию о профессиональной направленности (структуре интересов, структуре интеллекта, структуре личности) и рекомендации по выбору того или иного направления подготовки Вы можете получить у психолога своей образовательной организации</p>{/source}