import { Draggable } from "../models/drag-drop";
import { Project } from "../models/project";
import { AutoBind } from "../decorators/autobind";
import { Component } from "./base-component";

//ProjectItem Class
export class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable
{
  private project: Project;
  constructor(hostId: string, project: Project) {
    super("single-project", hostId, false, project.id);
    this.project = project;
    this.configure();
    this.renderContent();
  }

  @AutoBind
  dragStartHandler(event: DragEvent): void {
    console.log(event);
    event.dataTransfer!.setData("text/plain", this.project.id);
    event.dataTransfer!.effectAllowed = "move";
  }

  @AutoBind
  dragEndHandler(_: DragEvent): void {
    console.log("Drag end");
  }

  get persons(): string {
    if (this.project.people == 1) {
      return "1 person";
    } else {
      return `${this.project.people} persons`;
    }
  }

  configure(): void {
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndHandler);
  }

  renderContent(): void {
    this.element.querySelector("h2")!.textContent = this.project.title;
    this.element.querySelector("h3")!.textContent = this.persons + " assigned.";
    this.element.querySelector("p")!.textContent = this.project.description;
  }
}
