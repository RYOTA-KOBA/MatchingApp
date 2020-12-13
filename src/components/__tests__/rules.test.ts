import * as firebase from "@firebase/rules-unit-testing";
import { TokenOptions } from "@firebase/rules-unit-testing/dist/src/api";
import { readFileSync } from "fs";

const projectId = "rule-test";
process.env.FIRESTORE_EMULATOR_HOST = "localhost:8080";

function getAuthFirestore(auth: TokenOptions) {
  return firebase.initializeTestApp({ projectId, auth }).firestore();
}

describe("firestore security test", () => {
  beforeAll(async () => {
    await firebase.loadFirestoreRules({
      projectId,
      rules: readFileSync("firestore.rules", "utf8"),
    });
  });

  afterEach(async () => {
    await firebase.clearFirestoreData({ projectId });
  });

  afterAll(async () => {
    await Promise.all(firebase.apps().map((app) => app.delete()));
  });

  describe("ユーザー読み書きテスト", () => {
    it("usersのデータは、ユーザ本人のみ書き込み可能", async () => {
      const firestore = getAuthFirestore({ uid: "Ptpygqu0PjWng2DTtLwu" });
      const ref = firestore.collection("users").doc("Ptpygqu0PjWng2DTtLwu");
      await firebase.assertSucceeds(
        ref.set({ username: "テスト" }, { merge: true })
      );
    });
  });
});
