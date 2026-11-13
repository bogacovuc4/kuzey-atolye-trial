"use client";
import { useActionState } from "react";
import { login } from "./actions";

export default function LoginForm() {
  const [error, action, pending] = useActionState(login, null);
  return (
    <form action={action} className="form">
      <div className="field">
        <label htmlFor="password">Yönetici Şifresi</label>
        <input id="password" name="password" type="password" className="input" autoComplete="current-password" required />
      </div>
      {error && <div className="alert err" role="alert">{error}</div>}
      <button className="btn btn-primary" disabled={pending}>{pending ? "Kontrol ediliyor…" : "Giriş Yap"}</button>
    </form>
  );
}
