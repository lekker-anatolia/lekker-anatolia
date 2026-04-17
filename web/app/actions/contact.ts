"use server";

import { strapiFetch } from "@/lib/strapi";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function submitContactForm(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = (formData.get("name") as string | null)?.trim() ?? "";
  const email = (formData.get("email") as string | null)?.trim() ?? "";
  const phone = (formData.get("phone") as string | null)?.trim() ?? "";
  const subject = (formData.get("subject") as string | null) ?? "algemene_vraag";
  const message = (formData.get("message") as string | null)?.trim() ?? "";

  if (!name || !email || !message) {
    return {
      status: "error",
      message: "Vul alle verplichte velden in.",
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { status: "error", message: "Voer een geldig e-mailadres in." };
  }

  const result = await strapiFetch({
    path: "/contact-submissions",
    method: "POST",
    body: {
      data: { name, email, phone, subject, message },
    },
  });

  if (result === null) {
    // Strapi is offline — log locally and still thank the user
    console.warn("[contact] Strapi unreachable, form submission lost:", {
      name,
      email,
      subject,
    });
  }

  return {
    status: "success",
    message:
      "Bedankt voor je bericht! We nemen zo snel mogelijk contact met je op.",
  };
}
