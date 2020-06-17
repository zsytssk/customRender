import { AppModel } from 'model/appModel';
import { SceneState } from './com/sceneManager';
import { Game } from './scene/game/game';

export const ViewState = {
    app_model: undefined as AppModel,
};

export function initAppModel() {
    const app_model = new AppModel();
    app_model.init();
    ViewState.app_model = app_model;
}
export function enterGame() {
    const { app_model } = ViewState;
    app_model.enterGame();
    SceneState.switchScene(Game, {});
}
