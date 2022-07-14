
import { Chapter, UNKNOWN } from "./chapter";



//  new Intermission("Intermission",["CFO"],"quip ",false,"http"),

const chapters: Chapter[] = [
  new Chapter("Arm 2; Loop 1", [], "He's not supposed to be here. What have you done? Arm2 will continue to update even as Arm1 resets.", true, "arm2.txt"),


]

//did you know we do this at work?
//can i convey to you the white hot anger i experience
//every time i try to track down some css class or another
//only to discover its defined in the html itself,
// injected fuck deep in some forgotten maze
//this hate is my gift to you

const full_of_rage_hack_the_stylesheets = (ele: Element) => {
  const bad_idea = document.createElement("style");
  const styles = `
  #intermission{
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 13px;
    width: 815px;
  }
  #title{
    font-size: 52px;
  }
  .quip{
    font-family: helvetica;
    font-size: 18px;
  }
  
  .date{
    padding-left: 5px;
    font-family: helvetica;
    font-size: 12px;

  }

  .size{
    padding-left: 5px;
    font-family: helvetica;
    font-size: 12px;

  }
  `;
  bad_idea.appendChild(document.createTextNode(styles));
  ele.append(bad_idea);
}

export const renderChapters = (force: boolean) => {
  const ele = document.querySelector("#intermission");
  console.log("JR NOTE: rendering intermission...ele is", ele)

  if (!ele || (!force &&ele.innerHTML !== "LOADING...")) {
    console.log("JR NOTE: it is not time to render")
    return;
  }
  ele.innerHTML = "<p id='title'>Chapter List</p>";
  full_of_rage_hack_the_stylesheets(ele);

  //do this first so i know how to order them
  for (let chapter of chapters) {
    chapter.gatherMetadata();
  }

  const compare = (a: Chapter, b: Chapter) => {
    //mostly i care about the case where theres sane things to compare
    if (a.date && b.date) {
      if (a.date !== UNKNOWN && b.date !== UNKNOWN) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    }
    if (a.date) {
      return 0;
    }

    return 1;
  }
  chapters.sort(compare);
  for (let chapter of chapters) {
    chapter.renderSelf(ele);
  }

}