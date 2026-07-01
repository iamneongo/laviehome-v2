"use client";

import { useState } from "react";
import { IdCard, Upload, UserRound } from "lucide-react";

type CheckoutFormProps = {
  bookingId: string;
  price: number;
};

export function CheckoutForm({ bookingId, price }: CheckoutFormProps) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);

    const fd = new FormData(e.currentTarget);
    const guestCount = Number(fd.get("guest_count") ?? 2);
    const surcharge = guestCount === 3 ? 50000 : guestCount === 4 ? 100000 : 0;

    try {
      await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: bookingId,
          customer_name: fd.get("customer_name"),
          customer_phone: fd.get("customer_phone"),
          guest_count: guestCount,
          notes: fd.get("notes"),
          has_car: fd.get("has_car") === "on",
          has_decoration: fd.get("has_decoration") === "on",
          discount_code: fd.get("discount_code"),
          amount: price + surcharge,
        }),
      });
      setSaved(true);
      // Scroll to payment section
      document.getElementById("payment")?.scrollIntoView({ behavior: "smooth" });
    } catch {
      // silently fail — booking was already created on page load
      document.getElementById("payment")?.scrollIntoView({ behavior: "smooth" });
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="grid gap-6" onSubmit={handleSubmit}>
      <section className="section-card p-6 md:p-8">
        <h2 className="flex items-center gap-2 text-xl font-extrabold tracking-[-0.025em]">
          <UserRound className="text-pink-200" size={21} /> Thông Tin Người Đặt
        </h2>
        <div className="mt-6 grid gap-5">
          <label className="grid gap-2 text-sm font-bold text-white/72">
            Họ và Tên (*)
            <input
              className="field-input !pl-5"
              name="customer_name"
              placeholder="Nhập họ và tên"
              required
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-white/72">
            Số Điện Thoại (*)
            <input
              className="field-input !pl-5"
              inputMode="tel"
              name="customer_phone"
              placeholder="Số điện thoại nhận mã mở khóa"
              required
            />
          </label>

          <div className="grid gap-3">
            <p className="text-sm font-bold text-white/72">Số Lượng Người</p>
            <div className="grid gap-3 md:grid-cols-3">
              {[
                ["2", "Đi 2 người", "Mặc định"],
                ["3", "Đi 3 người", "Phụ thu 50.000đ"],
                ["4", "Đi 4 người", "Phụ thu 100.000đ"],
              ].map(([value, title, note]) => (
                <label
                  key={value}
                  className="cursor-pointer rounded-2xl border-2 border-white/10 bg-white/5 p-4 transition duration-150 block has-[:checked]:border-pink-500 has-[:checked]:bg-pink-500/10 has-[:checked]:shadow-[4px_4px_0px_#f35abd] has-[:checked]:-translate-y-0.5 hover:border-white hover:bg-white/10"
                >
                  <input
                    className="sr-only"
                    type="radio"
                    name="guest_count"
                    value={value}
                    defaultChecked={value === "2"}
                  />
                  <span className="block font-extrabold text-white">{title}</span>
                  <span className="mt-1 block text-xs font-bold text-white/52">{note}</span>
                </label>
              ))}
            </div>
            <p className="text-xs font-semibold text-white/48">Trẻ em trên 10 tuổi tính như 1 slot ngồi.</p>
          </div>

          <label className="grid gap-2 text-sm font-bold text-white/72">
            Ghi Chú/Yêu Cầu Riêng (Tuỳ Chọn)
            <textarea
              className="min-h-28 rounded-2xl border-2 border-white/15 bg-white/5 px-5 py-4 text-sm font-semibold text-white outline-none transition placeholder:text-white/35 focus:border-pink-500 focus:bg-white/10 focus:shadow-[3px_3px_0px_#f35abd]"
              name="notes"
              placeholder="Ví dụ: đến muộn 10 phút, cần hỗ trợ thêm..."
            />
          </label>

          <label className="flex items-start gap-3 rounded-2xl border-2 border-white/10 bg-white/5 p-4 text-sm font-bold text-white/72 hover:border-white/20 transition-all duration-150 cursor-pointer has-[:checked]:border-pink-500 has-[:checked]:bg-pink-500/5">
            <input className="mt-1 accent-pink-500" type="checkbox" name="has_car" />
            <span>Đến bằng xe hơi (Để nhân viên hỗ trợ chỗ đỗ xe)</span>
          </label>
          <label className="flex items-start gap-3 rounded-2xl border-2 border-white/10 bg-white/5 p-4 text-sm font-bold text-white/72 hover:border-white/20 transition-all duration-150 cursor-pointer has-[:checked]:border-pink-500 has-[:checked]:bg-pink-500/5">
            <input className="mt-1 accent-pink-500" type="checkbox" name="has_decoration" />
            <span>Gói trang trí Sinh nhật, Ngày Lễ,... (tuỳ chọn, sẽ có nhân viên liên hệ tư vấn gói)</span>
          </label>
        </div>
      </section>

      <section className="section-card p-6 md:p-8">
        <h2 className="flex items-center gap-2 text-xl font-extrabold tracking-[-0.025em]">
          <IdCard className="text-pink-200" size={21} /> Xác Thực Căn Cước
        </h2>
        <p className="mt-3 text-sm font-semibold leading-6 text-white/58">
          Dữ liệu thẻ CCCD của bạn sẽ được mã hoá và tự động xoá sau khi check-out.
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <label className="checkout-upload">
            <Upload size={24} className="text-pink-300" />
            <span>Mặt Trước CCCD / Bằng Lái</span>
            <input type="file" accept="image/*" />
          </label>
          <label className="checkout-upload">
            <Upload size={24} className="text-pink-300" />
            <span>Mặt Sau CCCD / Bằng Lái</span>
            <input type="file" accept="image/*" />
          </label>
        </div>
        <label className="mt-5 flex items-start gap-3 text-sm font-semibold leading-6 text-white/62 cursor-pointer hover:text-white transition-colors">
          <input className="mt-1 accent-pink-500" type="checkbox" required />
          <span>
            Tôi đồng ý với{" "}
            <span className="text-yellow-200 font-bold">Điều khoản và điều kiện</span> và đồng ý
            bảo lãnh cho bạn cùng phòng.
          </span>
        </label>
      </section>

      <button
        type="submit"
        disabled={saving || saved}
        className="primary-button w-full py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {saving ? "Đang lưu..." : saved ? "Đã xác nhận — Chuyển đến thanh toán ↓" : "Xác Nhận & Chuyển Đến Thanh Toán"}
      </button>
    </form>
  );
}
