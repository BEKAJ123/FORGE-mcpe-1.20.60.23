// Определение goal под названием targetSeesMe
const targetSeesMe = {
    start: function(agent) {
        // Логика для начала goal
        agent.goals.targetSeesMe = true;
    },
    stop: function(agent) {
        // Логика для завершения goal
        agent.goals.targetSeesMe = false;
    }
};

// Создание ивентов для goal
const events = {
    physicsOn: function(agent) {
        agent.components.physics.enabled = true;
    },
    physicsOff: function(agent) {
        agent.components.physics.enabled = false;
    },
    becomeAngry: function(agent) {
        // Логика для становления моба злым
        agent.isAngry = true;
    },
    flee: function(agent, mobName) {
        // Логика для убегания моба
        // Добавление информации из вашего сообщения
        return {
            "minecraft:avoid_mobs": {
                "mobs_to_avoid": [ mobName ]
            }
        };
    },
    setSpeed: function(agent, speed) {
        // Логика для установки скорости моба
    },
    kill: function(agent) {
        // Логика для уничтожения моба
    }
};

// Пример использования goal и ивентов
const agent = {
    goals: {},
    isAngry: false, // Новое свойство для отслеживания злости моба
    components: {
        physics: {
            enabled: false,
            // Другие свойства физики моба
        }
    },
    lookAtTarget: function() {
        if (this.goals.targetSeesMe) {
            // Логика для определения что моб видит игрока
            events.physicsOn(this);
            events.becomeAngry(this);
            events.flee(this, "YourMobName"); // Передача имени своего моба
            events.setSpeed(this, 2.0);
        }
    }
};

targetSeesMe.start(agent); // Запуск goal
agent.lookAtTarget(); // Проверка, видит ли моб игрока
targetSeesMe.stop(agent); // Остановка goal

