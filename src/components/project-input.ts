import { AutoBind } from "../decorators/autobind";
import { projectState } from "../state/project-state";
import { Validateable, validate } from "../utils/validation";
import { Component } from "./base-component";
//Project input class
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "user-input");

    this.titleInputElement = this.element.querySelector(
      "#title"
    )! as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    )! as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      "#people"
    )! as HTMLInputElement;

    this.configure();
  }

  configure() {
    this.element.addEventListener("submit", this.submitHandler); //Add event lister for form
  }

  renderContent(): void {}

  //Submit Handler
  @AutoBind //Auto bind function decorator
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.getUserInput();
    if (Array.isArray(userInput)) {
      const [title, descrition, people] = userInput;
      console.log(title, descrition, people);
      projectState.addProject(title, descrition, people); // Call method from Projectstate class
      this.clearInputs();
    }
  }

  //Get user input and validate
  private getUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDesc = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const titleValidatable: Validateable = {
      value: enteredTitle,
      required: true,
    };

    const descValidatable: Validateable = {
      value: enteredDesc,
      required: true,
      minLength: 10,
      maxLength: 20,
    };

    const peopleValidatable: Validateable = {
      value: +enteredPeople, // + is equal to parseFloat or parseInt
      required: true,
      min: 3,
      max: 7,
    };

    if (
      validate(titleValidatable) &&
      validate(descValidatable) &&
      validate(peopleValidatable)
    ) {
      return [enteredTitle, enteredDesc, parseFloat(enteredPeople)];
    } else {
      alert("Invalide input, please try again!");
      return;
    }
  }

  //Clear inputs
  private clearInputs() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }
}
