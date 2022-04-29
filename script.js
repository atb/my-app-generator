"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mendixmodelsdk_1 = require("mendixmodelsdk");
const mendixplatformsdk_1 = require("mendixplatformsdk");
async function main() {
    const client = new mendixplatformsdk_1.MendixPlatformClient();
    const app = await client.createNewApp(`NewApp-${Date.now()}`, {
        repositoryType: "git",
    });
    const workingCopy = await app.createTemporaryWorkingCopy("main");
    const model = await workingCopy.openModel();
    const domainModelInterface = model.allDomainModels().filter(dm => dm.containerAsModule.name === "MyFirstModule")[0];
    const domainModel = await domainModelInterface.load();
    const entity = mendixmodelsdk_1.domainmodels.Entity.createIn(domainModel);
    entity.name = `NewEntity_${Date.now()}`;
    await model.flushChanges();
    await workingCopy.commitToRepository("main");
}
main().catch(console.error);
