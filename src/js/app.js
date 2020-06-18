$(document).ready(() => {
    /**
     * тугл меню
     */
    const $burger = $('.burger_main');
    const $menu = $('.sidebar');
    const $main = $('.main-content');

    $($burger).on('click', function () {
        $menu.add($main).add(this).toggleClass('active');
    });

    /**
     * табы
     */
    $('ul.tabs__caption').on('click', 'li:not(.active)', function () {
        $(this)
            .addClass('active').siblings().removeClass('active')
            .closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
    });

    /**
     * анимация при скролле
     */
    const SELECTOR = '.animate-block';
    const ANIMATED_CLASS_NAME = 'animated';

    if (IntersectionObserver) {
        const callback = function (entries) {
            entries.forEach(entry => {
                //if the element is visible, add the animated class
                if (entry.isIntersecting &&
                    !entry.target.classList.contains(ANIMATED_CLASS_NAME)) {
                    entry.target.classList.add(ANIMATED_CLASS_NAME);
                }
            });
        }

        const observer = new IntersectionObserver(callback, {
            root: null,
            threshold: 0.1
        });

        const $items = $(SELECTOR);
        $items.each((index, item) => observer.observe(item));
    }

    /**
     * шаманим с формой
     */
    $.fancybox.defaults.btnTpl.smallBtn = "<div class='burger burger_modal' data-fancybox-close></div>";
    $.fancybox.defaults.animationEffect = false;

    const ru = {
        "code": "ru",
        "messages": {
            "alpha": "Поле {_field_} может содержать только буквы",
            "alpha_dash": "Поле {_field_} может содержать только буквы, цифры и дефис",
            "alpha_num": "Поле {_field_} может содержать только буквы и цифры",
            "alpha_spaces": "Поле {_field_} может содержать только буквы и пробелы",
            "between": "Поле {_field_} должно быть между {min} и {max}",
            "confirmed": "Поле {_field_} не совпадает Подтверждение",
            "digits": "Поле {_field_} должно быть числовым и точно содержать {length} цифры",
            "dimensions": "Поле {_field_} должно быть {width} пикселей на {height} пикселей",
            "email": "Поле {_field_} должно быть действительным электронным адресом",
            "excluded": "Поле {_field_} должно быть допустимым значением",
            "ext": "Поле {_field_} должно быть действительным файлом. ({args})",
            "image": "Поле {_field_} должно быть изображением",
            "oneOf": "Поле {_field_} должно быть допустимым значением",
            "integer": "Поле {_field_} должно быть целым числом",
            "length": "Длина поля {_field_} должна быть {length}",
            "max": "Поле {_field_} не может быть более {length} символов",
            "max_value": "Поле {_field_} должно быть {max} или менее",
            "mimes": "Поле {_field_} должно иметь допустимый тип файла. ({args})",
            "min": "Поле {_field_} должно быть не менее {length} символов",
            "min_value": "Поле {_field_} должно быть {min} или больше",
            "numeric": "Поле {_field_} должно быть числом",
            "regex": "Поле {_field_} имеет ошибочный формат",
            "required": "Поле {_field_} обязательно для заполнения",
            "required_if": "Поле {_field_} обязательно для заполнения",
            "size": "Поле {_field_} должно быть меньше, чем {size}KB"
        }
    };

    VeeValidate.localize('ru', ru);

    Vue.component('validation-provider', VeeValidate.ValidationProvider);
    Vue.component('validation-observer', VeeValidate.ValidationObserver);

    Vue.directive('mask', VueMask.VueMaskDirective);

    const app = new Vue({
        el: '#app',
        data: {
            form: {
                name: null,
                email: null,
                phone: null,
                check: null
            }
        },
        methods: {
            hasValue(val) {
                return !!val ? 'has-value' : ''
            },

            getErrorIcon(invalid, hasValue) {
                return hasValue ? !invalid ? 'form-icon__success' : 'form-icon__error' : ''
            },

            toSuccessModal() {
                Object.keys(this.form).forEach((key) => {
                    this.form[key] = null;
                });

                requestAnimationFrame(() => {
                    this.$refs.form.reset();
                });

                $.fancybox.close();
                $.fancybox.open({
                    src: '#success-modal',
                    type: 'inline',
                    opts: {
                        touch: false,
                        btnTpl: {
                            smallBtn: ''
                        },
                    }
                });
            }
        },
    });
});