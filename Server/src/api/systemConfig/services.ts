import { prisma } from "../../database/prisma";

export const systemConfigService = {
  async initializeSystemConfig() {
    const defaultConfigs = [
      { configKey: "office_start_time", configValue: "10:00" },
      { configKey: "office_start_flexibility_minutes", configValue: "20" },
      { configKey: "office_end_time", configValue: "19:00" },
      { configKey: "lunch_start_time", configValue: "13:00" },
      { configKey: "lunch_end_time", configValue: "15:00" },
      { configKey: "lunch_max_duration_minutes", configValue: "60" },
      { configKey: "afk_flexibility_minutes", configValue: "10" },
      { configKey: "fajr_prayer_flexibility_minutes", configValue: "15" },
      { configKey: "zohar_prayer_flexibility_minutes", configValue: "20" },
      { configKey: "asar_prayer_flexibility_minutes", configValue: "15" },
      { configKey: "maghrib_prayer_flexibility_minutes", configValue: "15" },
      { configKey: "isha_prayer_flexibility_minutes", configValue: "20" },
      { configKey: "max_prayer_breaks_per_day", configValue: "1" },
      { configKey: "office_location_radius_meters", configValue: "100" },
      { configKey: "default_office_latitude", configValue: "31.740414" },
      { configKey: "default_office_longitude", configValue: "73.831978" },
      {
        configKey: "work_hours_calculation_method",
        configValue: "exclude_breaks",
      },
      { configKey: "late_arrival_threshold_minutes", configValue: "20" },
      { configKey: "early_departure_threshold_minutes", configValue: "0" },
    ];

    const results = [];

    for (const config of defaultConfigs) {
      const result = await prisma.systemConfig.upsert({
        where: { configKey: config.configKey },
        update: { configValue: config.configValue },
        create: config,
      });
      results.push(result);
    }

    return results;
  },

  async getAllConfigs() {
    return await prisma.systemConfig.findMany({
      orderBy: { configKey: "asc" },
    });
  },

  async getConfig(key: string) {
    return await prisma.systemConfig.findUnique({
      where: { configKey: key },
    });
  },

  async updateConfig(key: string, value: string) {
    return await prisma.systemConfig.update({
      where: { configKey: key },
      data: { configValue: value },
    });
  },

  async deleteConfig(key: string) {
    return await prisma.systemConfig.delete({
      where: { configKey: key },
    });
  },

  async getConfigValue(key: string): Promise<string | null> {
    const config = await this.getConfig(key);
    return config?.configValue || null;
  },

  async getNumericConfig(key: string): Promise<number | null> {
    const value = await this.getConfigValue(key);
    if (value === null) return null;
    const num = parseFloat(value);
    return isNaN(num) ? null : num;
  },
};
