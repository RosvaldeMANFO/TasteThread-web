import { environment } from "../../../environments/environment";

export class ActivationState {
    success: boolean = false;
    message: string = "";
    appName?: string = environment.app.name;
}