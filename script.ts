import { domainmodels } from "mendixmodelsdk";
import { MendixPlatformClient } from "mendixplatformsdk";

async function main() {
    const client = new MendixPlatformClient();

    const app = await client.createNewApp(`NewApp-${Date.now()}`, {
        repositoryType: "git",
    });

    const workingCopy = await app.createTemporaryWorkingCopy("main");
    const model = await workingCopy.openModel();

    const domainModelInterface = model.allDomainModels().filter(dm => dm.containerAsModule.name === "MyFirstModule")[0];
    const domainModel = await domainModelInterface.load();

    const entity = domainmodels.Entity.createIn(domainModel);
    entity.name = `NewEntity_${Date.now()}`;

    await model.flushChanges();

    await workingCopy.commitToRepository("main");
}

main().catch(console.error);
