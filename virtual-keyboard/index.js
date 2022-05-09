const adviсe = document.createElement('p');
    adviсe.classList.add('advice');
    adviсe.innerHTML = '<strong>Сменить раскладку можно</strong> нажатием кнопки <strong>EN</strong> на виртуальной клавиатуре';
    document.body.append(adviсe);
    
const textarea = document.createElement('textarea');
    textarea.classList.add('area');
    document.body.append(textarea);



const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: "",
        CapsLock: false,
        lang: 'en'
    },
    keyLayouts: {
    en: ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
    'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', 
    'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'enter', 'done',
    'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '↑', '/', 'Ctrl', 'EN', 'Space', 'Ctrl', 'Alt', '←', '↓', '→'
],
    ru: ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
    'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ',
    'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'enter', 'done',
    'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '↑', '/', 'Ctrl', 'RU', 'Space', 'Ctrl', 'Alt', '←', '↓', '→'
]
    },




    init() {
        
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");
        this.elements.main.classList.add("keyboard");
        this.elements.keysContainer.classList.add("keyboard-keys");
        this.elements.keysContainer.appendChild(this.createKeys());
        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard-key");
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        document.querySelectorAll(".area").forEach(element => {
            element.addEventListener('focus', () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                });
        });
    });
    },

    changeLang() {
        if (this.properties.lang === 'en') {
            return this.keyLayouts.en
        }
        if (this.properties.lang === 'ru') {
            return this.keyLayouts.ru
        }
    },


    createKeys() {
        const fragment = document.createDocumentFragment();
        // Creates HTML for an icon
        const createIconHTML = (iconName) => {
            return `<i class="material-icons">${iconName}</i>`;
        };

        this.changeLang().forEach(key => {
            const keyElement = document.createElement("button");
            if (this.properties.lang === 'en') {
                insertLineBreak = ['Backspace', ']', 'enter', '/'].indexOf(key) !== -1;
            }
            if (this.properties.lang === 'ru') {
                insertLineBreak = ['Backspace', 'ъ', 'enter', '/'].indexOf(key) !== -1;
            }
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard-key");

            switch (key) {
                case "Backspace":
                    keyElement.classList.add("keyboard-key-wide", "key_8");
                    keyElement.innerHTML = createIconHTML("backspace");

                    keyElement.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this.triggerEvent("oninput");
                    });

                    break;
                    

                case "CapsLock":
                    keyElement.classList.add("keyboard-key-wide", "keyboard-key-activatable", "key_20");
                    keyElement.innerHTML = createIconHTML("keyboard_capslock");

                    keyElement.addEventListener("click", () => {
                        this.toggleCapsLock();
                        keyElement.classList.toggle("keyboard-key-active", this.properties.capsLock);
                    });

                    break;

                case "enter":
                    keyElement.classList.add("keyboard-key-wide", "key_13");
                    keyElement.innerHTML = createIconHTML("keyboard_return");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this.triggerEvent("oninput");
                    });

                    break

                case 'EN':
                    keyElement.classList.add('keyboard-key-wide');
                    keyElement.textContent = key;
                    keyElement.addEventListener('click', () => {
                        if (this.properties.lang === 'en'){
                            this.properties.lang = 'ru';
    
                        } else if (this.properties.lang === 'ru') {
                            this.properties.lang = 'en';
    
                        }
                        this.elements.main.classList.add('keyboard-hidden');
                        this.init()                        


                        });
    
                        break;
    
                case 'RU':
                        keyElement.classList.add('keyboard-key-wide');
    
                        keyElement.textContent = key;
                        keyElement.addEventListener('click', () => {
                            if (this.properties.lang === 'en') {
                                this.properties.lang = 'ru';
    
                            } else if (this.properties.lang === 'ru') {
                                this.properties.lang = 'en';
    
                            }
                            this.elements.main.classList.add('keyboard-hidden');
                            this.init()
                        });
    
                        break;
    
    

                case "Space":
                    keyElement.classList.add("keyboard-key-extra", "key_32");
                    keyElement.innerHTML = createIconHTML("space_bar");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += " ";
                        this.triggerEvent("oninput");
                    });

                    break;

                case "done":
                    keyElement.classList.add("keyboard-key-wide", "key_16");
                    keyElement.innerHTML = createIconHTML("check_circle");

                    keyElement.addEventListener("click", () => {
                        this.close();
                        this.triggerEvent("onclose");
                    });

                    break;

                case 'Tab':
                    keyElement.classList.add("keyboard-key-wide", "key_9");
                    keyElement.innerHTML = createIconHTML("keyboard_tab");

                    keyElement.addEventListener('click', () => {
                        this.properties.value += "\t";
                        this.triggerEvent("oninput");
                    });

                    break;
                
                case 'Alt':
                    keyElement.innerHTML = "alt";
    
                    keyElement.addEventListener('keypress', () => {
                        this.properties.value += "";
                        this.triggerEvent("oninput");
                        });
    
                    break;
                
                case 'Ctrl':
                    keyElement.innerHTML = "ctrl";
        
                    keyElement.addEventListener('keypress', () => {
                        this.properties.value += "";
                        this.triggerEvent("oninput");
                        });
        
                    break;

                default:
                    keyElement.textContent = key.toLowerCase();
                    keyElement.textContent = key;
                    if (key > 'a' && key < 'z' || key > 'A' && key < 'Z') {
                        keyElement.classList.add(`key_${key}`);
                    } else {
                        keyElement.classList.add(`key_${key.charCodeAt()}`);
                    }

                    keyElement.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        this.triggerEvent("oninput");
                    });

                    break;
            }

            fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        });

        return fragment;
    },

    triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },
    getKey(keyCode, key) {
        let keyElement;
        if (key > 'a' && key < 'z' || key > 'A' && key < 'Z' ) {
            keyElement = document.querySelector(`.key_${key.toLowerCase()}`);
        } else {
            keyElement = document.querySelector(`.key_${keyCode}`);
        }
        if (keyElement) {
            keyElement.classList.add('active-key');
        }
        if (keyElement) {
            setTimeout(function () {
                keyElement.classList.remove('active-key');
            }, 150)
        }
    },

    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
    },

    close() {
        this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
    }

    
};

window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
    textarea.focus();
});
document.querySelector('.area').addEventListener('keypress', (event) => {
    const keyCode = event.keyCode;
    const key = event.key;
    Keyboard.getKey(keyCode, key);
})