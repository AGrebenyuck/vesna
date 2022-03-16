$(function(){

  $(".scroll-top").on("click", function (event) {
		event.preventDefault();

		var id  = $(this).attr('href'),
		top = $(id).offset().top;
		
		$('body,html').animate({scrollTop: top-100}, 1500);
	});

  $(window).scroll(function() {
    var height = $(window).scrollTop();
    
    if(height > 1500 && $('.scroll-top').length > 0){
      $('.scroll-top').addClass('scroll-top--active');
    } else{
      $('.scroll-top').removeClass('scroll-top--active');
    }
  });

  $('.menu__btn').on('click', function(){
    $('.menu__list').toggleClass('menu__list--active');
  });

  const projectThumb = new Swiper('.project-slider__thumb', {
    spaceBetween: 4,
    // slidesPerView: 11,
    freeMode: true,
    watchSlidesProgress: true,
    // allowTouchMove: false
    // centeredSlides: true,
    slidesPerView: 'auto',
  });
  const projectBig = new Swiper('.project-slider__big',{
    spaceBetween: 10,
    zoom: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    thumbs: {
      swiper: projectThumb
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
      renderFraction: function(currentClass, totalClass){
        return `<span class="${currentClass}"></span>
        <div class="swiper-scrollbar"></div> <span class="${totalClass}"></span>`
      },
      formatFractionCurrent: function(number) {
        if (number < 10) {
        number = '0' + number;
        }
        return number;
      },
      formatFractionTotal: function(number) {
        if (number < 10) {
        number = '0' + number;
        }
        return number;
      },
    },
    scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true
    }
  });

  // projectBig.controller.control = projectThumb;
  // projectThumb.controller.control = projectBig;


  $('.asked-questions__spoiler-top').on('click',function(){
    $(this).toggleClass('asked-questions__spoiler-top--active');
    $(this).next().slideToggle();
  });

  const testimonial = new Swiper('.testimonial__slider', {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
      renderFraction: function(currentClass, totalClass){
        return `<span class="${currentClass}"></span>
        <div class="swiper-scrollbar"></div> <span class="${totalClass}"></span>`
      },
      formatFractionCurrent: function(number) {
        if (number < 10) {
        number = '0' + number;
        }
        return number;
      },
      formatFractionTotal: function(number) {
        if (number < 10) {
        number = '0' + number;
        }
        return number;
      },
    },
    scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true
    }
  });
  const swiper = new Swiper('.header-content__slider', {
    
    breakpoints: {
      320: {
        pagination: false,
        navigation: false,
      },
      768: {
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
      1100: {
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction',
          renderFraction: function(currentClass, totalClass){
            return `<span class="${currentClass}"></span>
            <div class="swiper-scrollbar"></div> <span class="${totalClass}"></span>`
          },
          formatFractionCurrent: function(number) {
            if (number < 10) {
            number = '0' + number;
            }
            return number;
          },
          formatFractionTotal: function(number) {
              if (number < 10) {
              number = '0' + number;
              }
              return number;
          },
        },
        scrollbar: {
          el: '.swiper-scrollbar',
          draggable: true
        },
      }
    }
  });

  "use strict";

  function DynamicAdapt(type) {
    this.type = type;
  }

  DynamicAdapt.prototype.init = function () {
    const _this = this;
    // массив объектов
    this.оbjects = [];
    this.daClassname = "_dynamic_adapt_";
    // массив DOM-элементов
    this.nodes = document.querySelectorAll("[data-da]");

    // наполнение оbjects объктами
    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];
      const data = node.dataset.da.trim();
      const dataArray = data.split(",");
      const оbject = {};
      оbject.element = node;
      оbject.parent = node.parentNode;
      оbject.destination = document.querySelector(dataArray[0].trim());
      оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
      оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
      оbject.index = this.indexInParent(оbject.parent, оbject.element);
      this.оbjects.push(оbject);
    }

    this.arraySort(this.оbjects);

    // массив уникальных медиа-запросов
    this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
      return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
    }, this);
    this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
      return Array.prototype.indexOf.call(self, item) === index;
    });

    // навешивание слушателя на медиа-запрос
    // и вызов обработчика при первом запуске
    for (let i = 0; i < this.mediaQueries.length; i++) {
      const media = this.mediaQueries[i];
      const mediaSplit = String.prototype.split.call(media, ',');
      const matchMedia = window.matchMedia(mediaSplit[0]);
      const mediaBreakpoint = mediaSplit[1];

      // массив объектов с подходящим брейкпоинтом
      const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
        return item.breakpoint === mediaBreakpoint;
      });
      matchMedia.addListener(function () {
        _this.mediaHandler(matchMedia, оbjectsFilter);
      });
      this.mediaHandler(matchMedia, оbjectsFilter);
    }
  };

  DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
    if (matchMedia.matches) {
      for (let i = 0; i < оbjects.length; i++) {
        const оbject = оbjects[i];
        оbject.index = this.indexInParent(оbject.parent, оbject.element);
        this.moveTo(оbject.place, оbject.element, оbject.destination);
      }
    } else {
      for (let i = 0; i < оbjects.length; i++) {
        const оbject = оbjects[i];
        if (оbject.element.classList.contains(this.daClassname)) {
          this.moveBack(оbject.parent, оbject.element, оbject.index);
        }
      }
    }
  };

  // Функция перемещения
  DynamicAdapt.prototype.moveTo = function (place, element, destination) {
    element.classList.add(this.daClassname);
    if (place === 'last' || place >= destination.children.length) {
      destination.insertAdjacentElement('beforeend', element);
      return;
    }
    if (place === 'first') {
      destination.insertAdjacentElement('afterbegin', element);
      return;
    }
    destination.children[place].insertAdjacentElement('beforebegin', element);
  }

  // Функция возврата
  DynamicAdapt.prototype.moveBack = function (parent, element, index) {
    element.classList.remove(this.daClassname);
    if (parent.children[index] !== undefined) {
      parent.children[index].insertAdjacentElement('beforebegin', element);
    } else {
      parent.insertAdjacentElement('beforeend', element);
    }
  }

  // Функция получения индекса внутри родителя
  DynamicAdapt.prototype.indexInParent = function (parent, element) {
    const array = Array.prototype.slice.call(parent.children);
    return Array.prototype.indexOf.call(array, element);
  };

  // Функция сортировки массива по breakpoint и place 
  // по возрастанию для this.type = min
  // по убыванию для this.type = max
  DynamicAdapt.prototype.arraySort = function (arr) {
    if (this.type === "min") {
      Array.prototype.sort.call(arr, function (a, b) {
        if (a.breakpoint === b.breakpoint) {
          if (a.place === b.place) {
            return 0;
          }

          if (a.place === "first" || b.place === "last") {
            return -1;
          }

          if (a.place === "last" || b.place === "first") {
            return 1;
          }

          return a.place - b.place;
        }

        return a.breakpoint - b.breakpoint;
      });
    } else {
      Array.prototype.sort.call(arr, function (a, b) {
        if (a.breakpoint === b.breakpoint) {
          if (a.place === b.place) {
            return 0;
          }

          if (a.place === "first" || b.place === "last") {
            return 1;
          }

          if (a.place === "last" || b.place === "first") {
            return -1;
          }

          return b.place - a.place;
        }

        return b.breakpoint - a.breakpoint;
      });
      return;
    }
  };

  const da = new DynamicAdapt("max");
  da.init();
})