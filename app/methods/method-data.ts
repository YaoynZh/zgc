export type ThreatTag = "对抗攻击" | "自然噪声" | "边缘场景";

export type VideoVariant = {
  label: string;
  path: string;
  tags: ThreatTag[];
};

export type Scenario = {
  id: string;
  name: string;
  english: string;
  risks: string[];
  variants: VideoVariant[];
  status?: "available" | "planned";
};

export type Method = {
  id: string;
  slug: string;
  short: string;
  title: string;
  english: string;
  description: string;
  tags: ThreatTag[];
  accent: string;
  scenarios: Scenario[];
};

const scengeRoot = "/media/methods/M01_SCENGE/scenarios";
const driveArenaRoot = "/media/methods/M02_DriveArena/scenarios";
const threatRangeRoot = "/media/methods/M03_ThreatRange";
const chatSceneRoot = "/media/methods/M04_ChatScene/scenarios";

const baseVariant = (root: string, file: string, label: string, tags: ThreatTag[] = ["边缘场景"]): VideoVariant => ({
  label,
  path: `${root}/${file}`,
  tags,
});

const scengeScenarios: Scenario[] = [
  {
    id: "SCN-01", name: "直行遇到障碍物", english: "Straight Obstacle", risks: ["环境感知失准", "目标物行为干扰"],
    variants: [
      baseVariant(`${scengeRoot}/SCN-01_straight-obstacle/base`, "video_0000_id_0006.mp4", "基础样例 01"),
      baseVariant(`${scengeRoot}/SCN-01_straight-obstacle/base`, "video_0001_id_0023.mp4", "基础样例 02"),
      baseVariant(`${scengeRoot}/SCN-01_straight-obstacle/weather/snow-day`, "video_0000_id_0006_snow_day.mp4", "极端天气 · 暴雪", ["自然噪声", "边缘场景"]),
      baseVariant(`${scengeRoot}/SCN-01_straight-obstacle/weather/heavy-rain`, "video_0002_id_0006_heavy_rain.mp4", "极端天气 · 强降雨", ["自然噪声", "边缘场景"]),
      baseVariant(`${scengeRoot}/SCN-01_straight-obstacle/weather/night-rain`, "video_0004_id_0006_night_rain.mp4", "极端天气 · 夜间降雨", ["自然噪声", "边缘场景"]),
      baseVariant(`${scengeRoot}/SCN-01_straight-obstacle/weather/sandstorm`, "video_0006_id_0006_sandstorm.mp4", "极端天气 · 沙尘", ["自然噪声", "边缘场景"]),
    ],
  },
  { id: "SCN-02", name: "转弯遇到障碍物", english: "Turning Obstacle", risks: ["主机动作失控", "目标物行为干扰"], variants: [
    baseVariant(`${scengeRoot}/SCN-02_turning-obstacle/base`, "video_0006_id_0018.mp4", "基础样例 01"),
    baseVariant(`${scengeRoot}/SCN-02_turning-obstacle/base`, "video_0007_id_0024.mp4", "基础样例 02"),
  ] },
  { id: "SCN-03", name: "变道场景", english: "Lane Changing", risks: ["主机动作失控"], variants: [
    baseVariant(`${scengeRoot}/SCN-03_lane-changing/base`, "video_0004_id_0003.mp4", "基础样例 01"),
    baseVariant(`${scengeRoot}/SCN-03_lane-changing/base`, "video_0005_id_0047.mp4", "基础样例 02"),
  ] },
  { id: "SCN-04", name: "超车 / 会车 / 车辆经过", english: "Vehicle Passing", risks: ["目标物行为干扰"], variants: [
    baseVariant(`${scengeRoot}/SCN-04_vehicle-passing/base`, "video_0024_id_0007.mp4", "基础样例 01"),
    baseVariant(`${scengeRoot}/SCN-04_vehicle-passing/base`, "video_0025_id_0011.mp4", "基础样例 02"),
  ] },
  { id: "SCN-05", name: "闯红灯", english: "Red-light Running", risks: ["目标物行为干扰"], variants: [
    baseVariant(`${scengeRoot}/SCN-05_red-light-running/base`, "video_0004_id_0000.mp4", "基础样例 01"),
    baseVariant(`${scengeRoot}/SCN-05_red-light-running/base`, "video_0005_id_0001.mp4", "基础样例 02"),
  ] },
  { id: "SCN-06", name: "无保护左转", english: "Unprotected Left-turn", risks: ["目标物行为干扰"], variants: [
    baseVariant(`${scengeRoot}/SCN-06_unprotected-left-turn/base`, "video_0002_id_0028.mp4", "基础样例 01"),
    baseVariant(`${scengeRoot}/SCN-06_unprotected-left-turn/base`, "video_0003_id_0049.mp4", "基础样例 02"),
  ] },
  { id: "SCN-07", name: "右转", english: "Right-turn", risks: ["主机动作失控"], variants: [
    baseVariant(`${scengeRoot}/SCN-07_right-turn/base`, "video_0006_id_0035.mp4", "基础样例 01"),
    baseVariant(`${scengeRoot}/SCN-07_right-turn/base`, "video_0007_id_0038.mp4", "基础样例 02"),
  ] },
  { id: "SCN-08", name: "路口协商通行", english: "Crossing Negotiation", risks: ["目标物行为干扰"], variants: [
    baseVariant(`${scengeRoot}/SCN-08_crossing-negotiation/base`, "video_0002_id_0014.mp4", "基础样例 01"),
    baseVariant(`${scengeRoot}/SCN-08_crossing-negotiation/base`, "video_0003_id_0027.mp4", "基础样例 02"),
  ] },
  { id: "SCN-09", name: "前车紧急制动", english: "Leading Vehicle Emergency Braking", risks: ["主机动作失控", "目标物行为干扰"], variants: [
    baseVariant(`${scengeRoot}/SCN-09_emergency-braking/base`, "video_0000_id_0000.mp4", "基础样例 01"),
    baseVariant(`${scengeRoot}/SCN-09_emergency-braking/base`, "video_0004_id_0000.mp4", "基础样例 02"),
  ] },
  { id: "SCN-10", name: "高速汇入冲突", english: "Highway Merge Conflict", risks: ["主机动作失控", "目标物行为干扰"], variants: [
    baseVariant(`${scengeRoot}/SCN-10_highway-merge-conflict/base`, "video_0000_id_0000.mp4", "基础样例 01"),
    baseVariant(`${scengeRoot}/SCN-10_highway-merge-conflict/base`, "video_0001_id_0001.mp4", "基础样例 02"),
    baseVariant(`${scengeRoot}/SCN-10_highway-merge-conflict/base`, "video_0002_id_0000.mp4", "基础样例 03"),
    baseVariant(`${scengeRoot}/SCN-10_highway-merge-conflict/base`, "video_0007_id_0001.mp4", "基础样例 04"),
  ] },
  { id: "SCN-11", name: "逆行车辆侵入", english: "Wrong-way Intrusion", risks: ["目标物行为干扰"], variants: [
    baseVariant(`${scengeRoot}/SCN-11_wrong-way-intrusion/base`, "video_0000_id_0000.mp4", "基础样例 01"),
    baseVariant(`${scengeRoot}/SCN-11_wrong-way-intrusion/base`, "video_0002_id_0000.mp4", "基础样例 02"),
  ] },
  { id: "SCN-12", name: "倒车驶出冲突", english: "Backing-out Conflict", risks: ["目标物行为干扰"], variants: [], status: "planned" },
  { id: "SCN-13", name: "摩托车穿行", english: "Motorcycle Crossing", risks: ["环境感知失准", "目标物行为干扰"], variants: [], status: "planned" },
  { id: "SCN-14", name: "紧急车辆避让", english: "Emergency Vehicle Yielding", risks: ["主机动作失控", "环境感知失准"], variants: [], status: "planned" },
  { id: "SCN-15", name: "环岛汇入", english: "Roundabout Merge", risks: ["主机动作失控", "目标物行为干扰"], variants: [], status: "planned" },
];

const attackFiles = [
  "000003_ed4feec4_attack.mp4", "000008_e9ae8c38_attack.mp4", "000020_0af54713_attack.mp4",
  "000027_d2db7e12_attack.mp4", "000028_4cea46b8_attack.mp4", "000037_26ce0c76_attack.mp4",
  "000044_60565417_attack.mp4", "000046_08dfcb4b_attack.mp4", "000055_149a7945_attack.mp4",
  "000061_3110b23f_attack.mp4", "000062_4523fb98_attack.mp4", "000068_205c60f1_attack.mp4",
  "000073_d5686f47_attack.mp4", "000075_964b2b96_attack.mp4", "000076_6de71c96_attack.mp4",
  "000077_e007e23c_attack.mp4", "000082_4094ae46_attack.mp4", "000084_3c18f85f_attack.mp4",
  "000089_b767ec16_attack.mp4", "000093_62abb19c_attack.mp4", "000094_e4908d72_attack.mp4",
  "000097_dad9942e_attack.mp4", "000102_611ea36f_attack.mp4", "000121_939ffb96_attack.mp4",
  "000124_cf1f7641_attack.mp4", "000133_e7dde704_attack.mp4", "000136_d65e5cdd_attack.mp4",
  "000140_115f9017_attack.mp4", "000160_d5c86824_attack.mp4", "000194_20d3e54a_attack.mp4",
  "000195_60832ea2_attack.mp4",
];

const threatRangeScenarios: Scenario[] = [
  {
    id: "TR-01", name: "视觉幻影对抗攻击", english: "View Mirage Adversarial Attack", risks: ["环境感知失准"],
    variants: attackFiles.map((file, index) => baseVariant(`${threatRangeRoot}/adversarial_attack/view_mirage`, file, `攻击样例 ${String(index + 1).padStart(2, "0")}`, ["对抗攻击"])),
  },
  { id: "TR-02", name: "穿越火灾区域", english: "Driving Through Fire", risks: ["环境感知失准", "主机动作失控"], variants: [
    baseVariant(`${threatRangeRoot}/nature_noise/穿越火灾区域`, "穿过火灾.mp4", "火灾环境演化", ["自然噪声", "边缘场景"]),
  ] },
  { id: "TR-03", name: "前车切入并刹停", english: "Cut-in and Hard Braking", risks: ["主机动作失控", "目标物行为干扰"], variants: [
    baseVariant(`${threatRangeRoot}/safety_critical_scenarios/前车切入并刹停/round_1`, "dwm_bev_round1.mp4", "第 1 轮演化"),
    baseVariant(`${threatRangeRoot}/safety_critical_scenarios/前车切入并刹停/round_2`, "dwm_bev_round2.mp4", "第 2 轮演化"),
  ] },
  { id: "TR-04", name: "前车溜车", english: "Leading Vehicle Rollback", risks: ["目标物行为干扰"], variants: [
    baseVariant(`${threatRangeRoot}/safety_critical_scenarios/前车溜车`, "前车溜车.mp4", "风险场景演化"),
  ] },
  { id: "TR-05", name: "后车并线超车", english: "Rear Vehicle Overtaking", risks: ["目标物行为干扰", "主机动作失控"], variants: [
    baseVariant(`${threatRangeRoot}/safety_critical_scenarios/后车并线超车`, "后车并线超车.mp4", "风险场景演化"),
  ] },
  { id: "TR-06", name: "行人横穿马路", english: "Pedestrian Crossing", risks: ["环境感知失准", "目标物行为干扰"], variants: [
    baseVariant(`${threatRangeRoot}/safety_critical_scenarios/行人横穿马路`, "行人横穿马路.mp4", "风险场景演化"),
  ] },
  { id: "TR-07", name: "雨天右侧车辆掉头并侧滑", english: "Rainy U-turn and Sideslip", risks: ["环境感知失准", "目标物行为干扰", "主机动作失控"], variants: [
    ...["round_001", "round_002", "round_003"].flatMap((round, index) => [
      baseVariant(`${threatRangeRoot}/safety_critical_scenarios/雨天右侧车辆掉头并侧滑/${round}/dd2_vis`, "dd2_world_model.mp4", `第 ${index + 1} 轮 · 世界模型`, ["自然噪声", "边缘场景"]),
      baseVariant(`${threatRangeRoot}/safety_critical_scenarios/雨天右侧车辆掉头并侧滑/${round}/dd2_vis`, "dd2_world_model_bev.mp4", `第 ${index + 1} 轮 · BEV`, ["自然噪声", "边缘场景"]),
    ]),
    baseVariant(`${threatRangeRoot}/safety_critical_scenarios/雨天右侧车辆掉头并侧滑/round_002/dd2_vis`, "dd2_world_model_uniad_layout.mp4", "第 2 轮 · UniAD 布局", ["自然噪声", "边缘场景"]),
    baseVariant(`${threatRangeRoot}/safety_critical_scenarios/雨天右侧车辆掉头并侧滑/round_003/dd2_vis`, "dd2_world_model_uniad_layout.mp4", "第 3 轮 · UniAD 布局", ["自然噪声", "边缘场景"]),
    baseVariant(`${threatRangeRoot}/safety_critical_scenarios/雨天右侧车辆掉头并侧滑/round_003/dd2_vis`, "dd2_world_model_terminal_trim.mp4", "第 3 轮 · 终局片段", ["自然噪声", "边缘场景"]),
  ] },
  { id: "TR-DEMO", name: "ThreatRange 方法演示", english: "ThreatRange Demonstration", risks: ["综合威胁演化"], variants: [
    baseVariant(`${threatRangeRoot}/宣传demo`, "ThreatRange.mp4", "完整方法演示", ["对抗攻击", "自然噪声", "边缘场景"]),
  ] },
];

export const methods: Method[] = [
  {
    id: "01", slug: "scenge", short: "ScenGE", accent: "SCENGE", title: "安全关键场景对抗生成与协同演化",
    english: "Adversarial Generation and Collaborative Evolution of Safety-Critical Scenarios",
    description: "围绕自动驾驶安全关键场景进行对抗生成与协同演化，覆盖基础驾驶任务及多种极端天气变体。",
    tags: ["自然噪声", "边缘场景"], scenarios: scengeScenarios,
  },
  {
    id: "02", slug: "drivearena", short: "DriveArena", accent: "DRIVEARENA", title: "复杂驾驶环境与对抗交互生成",
    english: "Interactive Driving Environment and Adversarial Scenario Generation",
    description: "通过可控驾驶环境生成基准、恶劣天气和对抗交互场景，直观对比车辆在环境扰动与高风险行为下的响应。",
    tags: ["对抗攻击", "自然噪声", "边缘场景"],
    scenarios: [
      { id: "DA-00", name: "环境驾驶", english: "Environmental Driving", risks: ["环境感知失准"], variants: [
        baseVariant(`${driveArenaRoot}/SCN-00_environmental-driving/base`, "clear-day-singapore-onenorth.mp4", "晴天基准场景"),
        baseVariant(`${driveArenaRoot}/SCN-00_environmental-driving/weather/foggy-morning`, "foggy-morning-singapore-onenorth.mp4", "雾天早晨", ["自然噪声"]),
        baseVariant(`${driveArenaRoot}/SCN-00_environmental-driving/weather/heavy-rain`, "heavy-rain-wet-road-singapore-onenorth.mp4", "强降雨湿滑路面", ["自然噪声"]),
        baseVariant(`${driveArenaRoot}/SCN-00_environmental-driving/weather/night-city`, "night-city-singapore-onenorth.mp4", "夜间城市", ["自然噪声"]),
      ] },
      { id: "DA-01", name: "直行紧急制动", english: "Straight Obstacle and Hard Braking", risks: ["主机动作失控", "目标物行为干扰"], variants: [
        baseVariant(`${driveArenaRoot}/SCN-01_straight-obstacle/base`, "hard-brake-front-safety-critical.mp4", "前车紧急制动"),
      ] },
      { id: "DA-03", name: "并线切入与碰撞", english: "Lane-changing Cut-in and Collision", risks: ["主机动作失控", "目标物行为干扰"], variants: [
        baseVariant(`${driveArenaRoot}/SCN-03_lane-changing/base`, "paired-baseline.mp4", "配对基线"),
        baseVariant(`${driveArenaRoot}/SCN-03_lane-changing/base`, "cut-in-collision-bev-showcase.mp4", "切入碰撞 · BEV", ["边缘场景"]),
        baseVariant(`${driveArenaRoot}/SCN-03_lane-changing/base`, "cut-in-attack-adversary-collision.mp4", "对抗切入攻击", ["对抗攻击", "边缘场景"]),
      ] },
    ],
  },
  {
    id: "03", slug: "threatrange", short: "ThreatRange", accent: "THREAT RANGE", title: "多类复杂威胁范围演化与验证",
    english: "Multi-dimensional Threat Range Evolution and Validation",
    description: "集中展示视觉对抗攻击、自然环境噪声与安全关键交互场景，并保留多轮世界模型演化结果。",
    tags: ["对抗攻击", "自然噪声", "边缘场景"], scenarios: threatRangeScenarios,
  },
  {
    id: "04", slug: "chatscene", short: "ChatScene", accent: "CHATSCENE", title: "交互式语义驱动的驾驶场景生成",
    english: "Interactive Semantic-driven Driving Scenario Generation",
    description: "以交互式语义描述驱动驾驶场景构建，将 RGB 与 BEV 视角组合展示，用于核对直行障碍和变道交互结果。",
    tags: ["边缘场景"],
    scenarios: [
      { id: "CS-01", name: "直行障碍场景", english: "Straight Obstacle · RGB + BEV", risks: ["环境感知失准", "目标物行为干扰"], variants: [
        baseVariant(`${chatSceneRoot}/SCN-01_straight-obstacle/base`, "rgb-bev-s1-r6-b1-id0005.mp4", "RGB + BEV 联合展示"),
      ] },
      { id: "CS-03", name: "变道交互场景", english: "Lane Changing · RGB + BEV", risks: ["主机动作失控", "目标物行为干扰"], variants: [
        baseVariant(`${chatSceneRoot}/SCN-03_lane-changing/base`, "rgb-bev-s3-r8-b2-id0007.mp4", "RGB + BEV 联合展示"),
      ] },
    ],
  },
];

export const methodsBySlug = Object.fromEntries(methods.map((method) => [method.slug, method])) as Record<string, Method>;

export const methodVideoCount = (method: Method) => method.scenarios.reduce((total, scenario) => total + scenario.variants.length, 0);
export const availableScenarioCount = (method: Method) => method.scenarios.filter((scenario) => scenario.status !== "planned").length;
