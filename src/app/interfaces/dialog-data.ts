import { IPeople } from "./people";
import { IPlanets } from "./planets";
import { IStarships } from "./starships";
import { typeParams } from "./type";

interface IDialogInterface extends IPeople,IPlanets,IStarships {
}

export interface IDialogData {
    data: IDialogInterface,
    template: typeParams
}