import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import type { EnrollLeadPayload } from "@/lib/supabase/leads"

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as EnrollLeadPayload

    const supabase = createServerSupabaseClient()
    const { error } = await supabase.from("leads").insert({
      type: "enroll",
      full_name: body.fullName,
      email: body.email,
      country_code: body.countryCode,
      phone: body.phone,
      city: body.city,
      qualification: body.qualification,
      profession: body.profession,
      experience_level: body.experienceLevel,
      terms_accepted: body.termsAccepted,
      metadata: { source: "landing_page_enroll_modal" },
    })

    if (error) {
      console.error("[enroll] Supabase insert failed:", error.message)
      return NextResponse.json(
        { ok: false, message: "Unable to save your enrollment. Please try again." },
        { status: 500 },
      )
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("[enroll] Unexpected error:", error)
    return NextResponse.json(
      { ok: false, message: "Something went wrong. Please try again." },
      { status: 500 },
    )
  }
}
