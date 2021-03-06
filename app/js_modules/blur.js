import pageY from "./helpFunctions/pageY";
export default function initBlur() {
  let set = () => {
    let bgOuter = document.querySelector(".wrapper--works"),
      bgInner = document.querySelector(".callback-form__blur"),
      bgInnerStyles = bgInner.style;

    // определение высоты всего документа
    let body = document.body,
      html = document.documentElement;
    let documentHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );

    // найдем необходимые св ва
    // ширина внешнего фона
    let widthBgOuter = bgOuter.offsetWidth,
      // расстоние от вреза до плашки, чтобы потом это расстояние вычесть у позишн внутреннего bg
      leftBgInner = -bgInner.getBoundingClientRect().left,
      // расстояние от нижнего края документа
      bottomBgInner = -(
        documentHeight -
        (pageY(bgInner) + bgInner.offsetHeight)
      );

    // применяем св ва
    // для size width и height
    bgInnerStyles.backgroundSize = widthBgOuter + "px" + " " + "auto";
    bgInnerStyles.backgroundPosition = `left ${leftBgInner}px  bottom ${bottomBgInner}px`;
  };

  //вызываем функцию при загрузке страницы
  set();

  //  если страница меняется в размере то вызываем ее опять чтобы изменить бэкграунд
  window.addEventListener("resize", function() {
    set();
  });
}
