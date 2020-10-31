import {
  KintoneRestAPIClient,
  KintoneRecordField,
} from "@kintone/rest-api-client";

const client = new KintoneRestAPIClient();

// @kintone/rest-api-clientの型
// 現時点では手動生成する必要がある
type MyAppRecord = {
  $id: KintoneRecordField.ID;
  $revision: KintoneRecordField.Revision;
  FAX: KintoneRecordField.SingleLineText;
  TEL: KintoneRecordField.SingleLineText;
  メールアドレス: KintoneRecordField.SingleLineText;
  レコード番号: KintoneRecordField.RecordNumber;
  会社ロゴ: KintoneRecordField.File;
  会社名: KintoneRecordField.SingleLineText;
  住所: KintoneRecordField.SingleLineText;
  作成日時: KintoneRecordField.Creator;
  作成者: KintoneRecordField.CreatedTime;
  備考: KintoneRecordField.MultiLineText;
  担当者名: KintoneRecordField.SingleLineText;
  更新日時: KintoneRecordField.UpdatedTime;
  更新者: KintoneRecordField.Modifier;
  部署名: KintoneRecordField.SingleLineText;
  郵便番号: KintoneRecordField.SingleLineText;
  顧客ランク: KintoneRecordField.Dropdown;
};

// @kintone/dts-genで生成した型を利用
interface DetailEvent {
  appId: number;
  record: kintone.types.SavedFields;
  recordId: number;
  type: string;
}

kintone.events.on("app.record.detail.show", async (event: DetailEvent) => {
  const response = await client.record.getRecords<MyAppRecord>({
    app: event.appId,
  });
  const companyNames = response.records.map((record) => record.会社名.value);
  console.log(companyNames);
});
