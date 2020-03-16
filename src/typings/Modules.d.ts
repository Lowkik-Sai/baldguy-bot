import { CommandComponent } from "./Command";

export interface ModuleComponent {
    name: string;
    path: string;
    commands: CommandComponent[];
}