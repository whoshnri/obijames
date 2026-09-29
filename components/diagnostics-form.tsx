"use client";

import { useMemo, useState, type FormEvent } from "react";
import { serviceOptions, SERVICE_NOT_SURE } from "@/lib/services";
import { publicApiPost } from "@/lib/public-api";
import { Hand } from "lucide-react";
import { SpinnerGapIcon } from "@phosphor-icons/react";

const DAY_RANGES = [
  "Any weekday",
  "Any day",
  "Mondays",
  "Tuesdays",
  "Wednesdays",
  "Thursdays",
  "Fridays",
  "Weekends",
];

function buildTimeOptions() {
  const options: string[] = [];
  for (let minutes = 6 * 60; minutes <= 21 * 60; minutes += 30) {
    const hours24 = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const period = hours24 >= 12 ? "PM" : "AM";
    const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
    options.push(`${hours12}:${String(mins).padStart(2, "0")} ${period}`);
  }
  return options;
}

const TIME_OPTIONS = buildTimeOptions();

const inputClass =
  "w-full border border-[var(--obi-border)] rounded-sm bg-white px-4 py-3 text-sm text-[var(--obi-navy)] outline-none transition placeholder:text-[var(--obi-muted)]/60 focus:border-[var(--obi-navy)]";

const labelClass =
  "text-xs font-semibold text-[var(--obi-muted)] uppercase";

type Status = "idle" | "submitting" | "success" | "error";

export function DiagnosticsForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactMode, setContactMode] = useState<"email" | "phone">("phone");
  const [altContact, setAltContact] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [role, setRole] = useState("");
  const [service, setService] = useState("");
  const [dayRange, setDayRange] = useState("Any weekday");
  const [timeStart, setTimeStart] = useState("9:00 AM");
  const [timeEnd, setTimeEnd] = useState("5:00 PM");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const altContactLabel = contactMode === "phone" ? "Phone number" : "Alternative email";
  const altContactPlaceholder =
    contactMode === "phone" ? "+44 7000 000000" : "you@example.com";

  const timeInvalid = useMemo(() => {
    if (!timeStart || !timeEnd) return false;
    return TIME_OPTIONS.indexOf(timeEnd) <= TIME_OPTIONS.indexOf(timeStart);
  }, [timeStart, timeEnd]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!name.trim() || !email.trim()) {
      setError("Please add your name and email so we can reply.");
      setStatus("error");
      return;
    }
    if (timeInvalid) {
      setError("Your end time needs to be after your start time.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    try {
      await publicApiPost("/public/diagnostics", {
        name: name.trim(),
        email: email.trim(),
        altContactType: altContact.trim() ? contactMode : null,
        altContactValue: altContact.trim() || null,
        organisation: organisation.trim() || null,
        role: role.trim() || null,
        preferredService: service || null,
        dayRange,
        timeStart,
        timeEnd,
        message: message.trim() || null,
      });
      setStatus("success");
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Something went wrong. Please try again.",
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-[var(--obi-border)] bg-white px-6 py-12 text-center md:px-12">
        <p className="text-xs font-semibold tracking-[0.16em] text-[var(--obi-muted)] uppercase">

        </p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--obi-navy)]">
          Thank you, {name.split(" ")[0] || "there"}.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[var(--obi-muted)]">
          We have your details and preferred time. A member of the team will be in
          touch to book your discovery call.
        </p>
        <div className="mx-auto mt-8 max-w-md border border-[var(--obi-border)] bg-[var(--obi-bg)] px-6 py-5 text-left text-sm text-[var(--obi-muted)]">
          <p className="font-semibold text-[var(--obi-navy)]">What happens next</p>
          <ol className="mt-3 space-y-2 list-decimal pl-4">
            <li>We review what you have shared.</li>
            <li>We confirm a time inside your availability.</li>
            <li>On the call we work out what would help most.</li>
          </ol>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <fieldset className="space-y-5">
        <legend className={labelClass}>About you</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className={labelClass}>Full name</span>
            <input
              className={`${inputClass} mt-2`}
              value={name}
              placeholder="Rhema Lambhert"
              onChange={(event) => setName(event.target.value)}
              required
              autoComplete="name"
            />
          </label>
          <label className="block">
            <span className={labelClass}>Email</span>
            <input
              className={`${inputClass} mt-2`}
              type="email"
              placeholder="gadolphus@nuru.io"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              autoComplete="email"
            />
          </label>
        </div>

        <div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className={labelClass}>Alternative contact</span>
            <div className="inline-flex border border-[var(--obi-border)] bg-white p-0.5 rounded-sm">
              {(["phone", "email"] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setContactMode(mode)}
                  aria-pressed={contactMode === mode}
                  className={[
                    "px-4 py-1.5 text-xs font-semibold capitalize cursor-pointer transition",
                    contactMode === mode
                      ? "bg-[var(--obi-navy)] text-white"
                      : "text-[var(--obi-muted)] hover:text-[var(--obi-navy)]",
                  ].join(" ")}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
          <input
            className={`${inputClass} mt-2`}
            type={contactMode === "email" ? "email" : "tel"}
            value={altContact}
            onChange={(event) => setAltContact(event.target.value)}
            placeholder={altContactPlaceholder}
            aria-label={altContactLabel}
          />
          <p className="mt-2 text-xs text-[var(--obi-muted)]">
            This is optional
          </p>
        </div>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className={labelClass}>Your organisation</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className={labelClass}>Organisation</span>
            <input
              placeholder="My Org"
              className={`${inputClass} mt-2`}
              value={organisation}
              onChange={(event) => setOrganisation(event.target.value)}
              autoComplete="organization"
            />
          </label>
          <label className="block">
            <span className={labelClass}>Your role</span>
            <input
              className={`${inputClass} mt-2`}
              value={role}
              onChange={(event) => setRole(event.target.value)}
              placeholder="e.g. Director of People"
            />
          </label>
        </div>
        <label className="block">
          <span className={labelClass}>What do you need most right now?</span>
          <select
            className={`${inputClass} mt-2`}
            value={service}
            onChange={(event) => setService(event.target.value)}
          >
            <option value="">Select an option</option>
            {serviceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        {service === SERVICE_NOT_SURE || !service ? (
          <p className="flex items-center gap-2 bg-[var(--obi-bg)] px-4 py-3 text-sm leading-6 text-[var(--obi-muted)]">
            <Hand/>
            Not sure yet? That is exactly what the discovery call is for - we will
            find out what works best for you together.
          </p>
        ) : null}
      </fieldset>

      <fieldset className="space-y-5">
        <legend className={labelClass}>When suits you for a discovery call?</legend>
        <p className="text-sm leading-6 text-[var(--obi-muted)]">
          Give us a window and we will find a time that fits.
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          <label className="block">
            <span className={labelClass}>Days</span>
            <select
              className={`${inputClass} mt-2`}
              value={dayRange}
              onChange={(event) => setDayRange(event.target.value)}
            >
              {DAY_RANGES.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className={labelClass}>From</span>
            <select
              className={`${inputClass} mt-2`}
              value={timeStart}
              onChange={(event) => setTimeStart(event.target.value)}
            >
              {TIME_OPTIONS.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className={labelClass}>To</span>
            <select
              className={`${inputClass} mt-2`}
              value={timeEnd}
              onChange={(event) => setTimeEnd(event.target.value)}
            >
              {TIME_OPTIONS.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </label>
        </div>
        <p className="text-xs text-[var(--obi-muted)]">
         i.e {dayRange} from {timeStart} to {timeEnd}
          {timeInvalid ? " - end time must be after the start time." : ""}
        </p>
      </fieldset>

      <label className="block">
        <span className={labelClass}>Anything else we should know?</span>
        <textarea
          className={`${inputClass} mt-2`}
          rows={4}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Optional"
        />
      </label>

      {status === "error" && error ? (
        <p className="text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "submitting" || timeInvalid}
          className="inline-flex bg-[var(--obi-navy)] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[var(--obi-navy-light)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? <SpinnerGapIcon className="animate-spin duration-300 ease-in-out"/> : "Request a discovery call"}
        </button>
      </div>
    </form>
  );
}
