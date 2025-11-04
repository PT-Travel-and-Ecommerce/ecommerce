"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface Setting {
  id: string;
  key: string;
  value: string;
  type: string;
}

export default function AdminSettings() {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [bankAccounts, setBankAccounts] = useState<string[]>([]);
  const [whatsappNumber, setWhatsappNumber] = useState("");

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    try {
      const res = await fetch("/api/settings");
      const data = await res.json();
      setSettings(data);

      const bankSetting = data.find((s: Setting) => s.key === "bank_accounts");
      if (bankSetting) {
        setBankAccounts(JSON.parse(bankSetting.value));
      }

      const whatsappSetting = data.find((s: Setting) => s.key === "whatsapp_number");
      if (whatsappSetting) {
        setWhatsappNumber(whatsappSetting.value);
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setLoading(false);
    }
  }

  async function saveBankAccounts() {
    try {
      await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: "bank_accounts",
          value: JSON.stringify(bankAccounts),
          type: "json",
        }),
      });
      alert("Bank accounts saved successfully!");
      fetchSettings();
    } catch (error) {
      console.error("Error saving bank accounts:", error);
      alert("Failed to save bank accounts");
    }
  }

  async function saveWhatsApp() {
    try {
      await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: "whatsapp_number",
          value: whatsappNumber,
          type: "string",
        }),
      });
      alert("WhatsApp number saved successfully!");
      fetchSettings();
    } catch (error) {
      console.error("Error saving WhatsApp:", error);
      alert("Failed to save WhatsApp number");
    }
  }

  function addBankAccount() {
    setBankAccounts([...bankAccounts, ""]);
  }

  function updateBankAccount(index: number, value: string) {
    const updated = [...bankAccounts];
    updated[index] = value;
    setBankAccounts(updated);
  }

  function removeBankAccount(index: number) {
    setBankAccounts(bankAccounts.filter((_, i) => i !== index));
  }

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <p className="text-gray-600 mt-1">Manage bank accounts and WhatsApp contact</p>
      </div>

      <div className="space-y-6">
        <div className="bg-white shadow sm:rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Bank Accounts</h3>
          <div className="space-y-3">
            {bankAccounts.map((account, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={account}
                  onChange={(e) => updateBankAccount(index, e.target.value)}
                  placeholder="e.g., BCA - 1234567890 - John Doe"
                  className="flex-1 border border-gray-300 rounded-md px-3 py-2"
                />
                <Button
                  type="button"
                  onClick={() => removeBankAccount(index)}
                  variant="outline"
                  className="text-red-600 hover:text-red-700"
                >
                  Remove
                </Button>
              </div>
            ))}
            <div className="flex gap-2 pt-2">
              <Button
                type="button"
                onClick={addBankAccount}
                variant="outline"
              >
                Add Bank Account
              </Button>
              <Button
                type="button"
                onClick={saveBankAccounts}
                className="bg-black text-white hover:bg-gray-800"
              >
                Save Bank Accounts
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-white shadow sm:rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">WhatsApp Contact</h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              placeholder="e.g., +6281234567890"
              className="flex-1 border border-gray-300 rounded-md px-3 py-2"
            />
            <Button
              type="button"
              onClick={saveWhatsApp}
              className="bg-black text-white hover:bg-gray-800"
            >
              Save WhatsApp
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Format: +62 followed by the phone number (without leading 0)
          </p>
        </div>
      </div>
    </div>
  );
}
