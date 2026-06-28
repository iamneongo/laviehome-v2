import { defineRouteConfig } from "@medusajs/admin-sdk";
import { Channels } from "@medusajs/icons";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SalesChannelsPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/settings/sales-channels");
  }, [navigate]);

  return null;
};

export const config = defineRouteConfig({
  label: "Kênh bán hàng",
  icon: Channels,
});

export default SalesChannelsPage;
