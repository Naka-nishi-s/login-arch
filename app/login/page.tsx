"use client";

import { useRouter } from "next/navigation";

export default function Login() {

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    try {
      console.log("Send Request");
      const response = await fetch("/api/login", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        // サーバーからのレスポンスがエラーを示している場合
        console.log("サーバーエラー", await response.text());
        return;
      }

      // 正常なレスポンスを処理
      const data = await response.json();
      console.log(data);
      console.log(data.location);

      if (data.location) {
        router.push(data.location);
      }

    } catch (e) {
      console.log("Error");
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" id="name" />
        <input type="password" name="pass" id="pass" />
        <button type="submit">決定</button>
      </form>
    </div>
  );
}
