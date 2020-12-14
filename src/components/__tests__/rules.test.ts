import * as firebase from "@firebase/rules-unit-testing";
import { TokenOptions } from "@firebase/rules-unit-testing/dist/src/api";
import { readFileSync } from "fs";

const projectId = "rule-test";
process.env.FIRESTORE_EMULATOR_HOST = "localhost:8080";

function getAuthFirestore(auth: TokenOptions) {
  return firebase.initializeTestApp({ projectId, auth }).firestore();
}

const serverTimestamp = () => firebase.firestore.FieldValue.serverTimestamp();

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
    await Promise.all(
      firebase.apps().map((app: { delete: () => any }) => app.delete())
    );
  });

  describe("ユーザー読み書きテスト", () => {
    it("usersのデータは、ユーザ本人のみ書き込み可能", async () => {
      const firestore = getAuthFirestore({ uid: "user" });
      const ref = firestore.collection("users").doc("user");
      await firebase.assertSucceeds(
        ref.set({ username: "サンプル", uid: "user", email: "email@email.com" })
      );

      const otherUserRef = firestore.collection("users").doc("userB");
      await firebase.assertFails(otherUserRef.set({ username: "サンプル" }));
    });

    it("usersのデータを本人以外が更新すると失敗", async () => {
      const firestore = getAuthFirestore({ uid: "user" });
      const otherUserRef = firestore.collection("users").doc("userB");
      await firebase.assertFails(
        otherUserRef.update({
          username: "userB",
          email: "userB@email.com",
          uid: "userB",
        })
      );
    });

    it("認証済みユーザーはusersのデータを閲覧可能", async () => {
      const firestore = getAuthFirestore({ uid: "user" });
      const ref = firestore.collection("users").doc("userB");
      await firebase.assertSucceeds(ref.get());
    });
  });

  describe("ユーザーデータのスキーマテスト", () => {
    it("正しくないスキーマの場合は作成できない", async () => {
      const firestore = getAuthFirestore({ uid: "user" });
      const ref = firestore.collection("users").doc("user");
      // 想定外のプロパティ
      await firebase.assertFails(
        ref.set({
          username: "サンプル",
          uid: "user",
          email: "email@email.com",
          age: 22,
        })
      );

      // プロパティの型が異なる場合
      await firebase.assertFails(
        ref.set({
          username: 111,
          uid: "user",
          email: "email@email.com",
        })
      );
      await firebase.assertFails(
        ref.set({
          username: "サンプル",
          uid: 111,
          email: "email@email.com",
        })
      );
      await firebase.assertFails(
        ref.set({
          username: "サンプル",
          uid: "user",
          email: 111,
        })
      );
    });

    it("正しくないスキーマの場合は編集できない", async () => {
      const firestore = getAuthFirestore({ uid: "user" });
      const ref = firestore.collection("users").doc("user");
      // 想定外のプロパティ
      await firebase.assertFails(ref.update({ age: 30 }));

      // プロパティの型が異なる場合
      await firebase.assertFails(ref.update({ name: 111 }));
      await firebase.assertFails(ref.update({ uid: 111 }));
      await firebase.assertFails(ref.update({ email: 111 }));
    });
  });

  describe("posts読み書きテスト", () => {
    it("postsは認証済みであれば閲覧可能", async () => {
      const firestore = getAuthFirestore({ uid: "user" });
      const ref = firestore.collection("posts");
      await firebase.assertSucceeds(ref.get());
    });

    it("認証済みユーザーのみpostsへの書き込み可能", async () => {
      const firestore = getAuthFirestore({ uid: "user" });
      const ref = firestore.collection("posts").doc("post");
      await firebase.assertSucceeds(
        ref.set({
          title: "title",
          content: "content",
          authorName: "taro",
          createdAt: serverTimestamp(),
          category: "category",
          uid: "user",
        })
      );
    });
  });

  describe("postsのスキーマテスト", () => {
    it("正しくないスキーマの場合は作成できない", async () => {
      const firestore = getAuthFirestore({ uid: "user" });
      const ref = firestore.collection("posts").doc("post");
      // 想定外のプロパティ
      await firebase.assertFails(
        ref.set({
          title: "title",
          content: "content",
          authorName: "taro",
          createdAt: serverTimestamp(),
          category: "category",
          uid: "user",
          otherProp: "想定外のデータ",
        })
      );

      // プロパティの型が異なる場合
      await firebase.assertFails(
        ref.set({
          title: 1,
          content: "content",
          authorName: "taro",
          createdAt: serverTimestamp(),
          category: "category",
          uid: "user",
        })
      );
      await firebase.assertFails(
        ref.set({
          title: "title",
          content: 1,
          authorName: "taro",
          createdAt: serverTimestamp(),
          category: "category",
          uid: "user",
        })
      );
      await firebase.assertFails(
        ref.set({
          title: "title",
          content: "content",
          authorName: 1,
          createdAt: serverTimestamp(),
          category: "category",
          uid: "user",
        })
      );
      await firebase.assertFails(
        ref.set({
          title: "title",
          content: "content",
          authorName: "taro",
          createdAt: 1,
          category: "category",
          uid: "user",
        })
      );
      await firebase.assertFails(
        ref.set({
          title: "title",
          content: "content",
          authorName: "taro",
          createdAt: serverTimestamp(),
          category: 1,
          uid: "user",
        })
      );
      await firebase.assertFails(
        ref.set({
          title: "title",
          content: "content",
          authorName: "taro",
          createdAt: serverTimestamp(),
          category: "category",
          uid: 1,
        })
      );
    });

    it("正しくないスキーマの場合は編集できない", async () => {
      const firestore = getAuthFirestore({ uid: "user" });
      const ref = firestore.collection("posts").doc("post");
      // 想定外のプロパティ
      await firebase.assertFails(ref.update({ otherProps: "想定外" }));

      // プロパティの型が異なる場合
      await firebase.assertFails(ref.update({ title: 111 }));
      await firebase.assertFails(ref.update({ content: 111 }));
      await firebase.assertFails(ref.update({ authorName: 111 }));
      await firebase.assertFails(ref.update({ createdAt: 111 }));
      await firebase.assertFails(ref.update({ category: 111 }));
      await firebase.assertFails(ref.update({ uid: 111 }));
    });
  });
});
