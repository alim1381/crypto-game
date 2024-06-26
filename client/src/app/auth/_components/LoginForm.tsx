"use client";

import ErrorAlert from "@/app/_components/alerts/ErrorAlert";
import Loader from "@/app/_components/loader/Loader";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

export default function LoginForm() {
  const router = useRouter();

  const [payload, setPayload] = useState<{
    username: string;
    password: string;
  }>({ username: "", password: "" });

  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<string | null | undefined>(null);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);

    signIn("credentials", {
      username: payload.username,
      password: payload.password,
      redirect: false,
    })
      .then((res) => {
        if (res?.ok) {
          router.refresh();
        } else {
          setError(res?.error || "Login is failed");
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      {error && <ErrorAlert text={error} />}

      {loading && <Loader />}

      <form onSubmit={submitHandler} className="space-y-4 md:space-y-6">
        <div>
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-white"
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={payload.username}
            onChange={(e) =>
              setPayload((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
            className=" border rounded-lg block w-full p-2.5 bg-neutral-900 border-neutral-600 placeholder-neutral-400 text-white outline-none focus:ring-yellow-400 focus:border-yellow-400"
            placeholder="satosh_o"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium  text-white"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={payload.password}
            onChange={(e) =>
              setPayload((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
            className=" border rounded-lg block w-full p-2.5 bg-neutral-900 border-neutral-600 placeholder-neutral-400 text-white outline-none focus:ring-yellow-400 focus:border-yellow-400"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          onClick={submitHandler}
          className="w-full text-white bg-gradient-to-t to-yellow-400 from-orange-400 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Login
        </button>
      </form>
    </>
  );
}
