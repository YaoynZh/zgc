# 无人驾驶复杂威胁场景本地展示原型

这是一个面向项目汇报与后续开发交接的本地展示站点。当前版本支持：

1. 首页展示课题指标和四种生成方法入口；
2. 点击方法卡片后进入该方法的独立成果页面；
3. ScenGE、DriveArena、ThreatRange 和 ChatScene 分别播放本地素材；
4. 同一场景内可切换不同天气、轮次、视角或攻击样例。

本版本没有数据库、后端接口、登录、上传或在线部署逻辑。

## 技术栈

- Next.js 16、React 19、TypeScript
- Vinext、Vite 8
- pnpm
- 本地静态媒体文件（MP4、PNG、JPG、SVG、JSON）

## 本地运行

环境要求：Node.js 22.13 或更高版本，以及 pnpm。

首次安装 pnpm 时可执行：

```bash
corepack enable
corepack prepare pnpm@latest --activate
```

```bash
git clone <仓库地址>
cd autonomous-threat-showcase
pnpm install
pnpm run dev
```

启动后终端会打印两个地址：

```text
➜  Local:   http://localhost:3000/
➜  Network: http://192.168.x.x:3000/   # 局域网地址，其他设备用这个
```

在本机浏览器访问 `http://localhost:3000`；同一局域网内的其他设备访问终端里显示的 `Network` 地址即可。

项目启动脚本会自动查找系统 Node.js；在 Codex 本地环境中也会自动使用其内置 Node.js 运行时。

## 局域网访问

开发服务器默认监听 `0.0.0.0:3000`（配置见 `vite.config.ts` 的 `server.host`，启动参数见 `package.json` 的 `dev` 脚本），因此同一局域网（同一个 Wi-Fi / 交换机）内的手机、平板、其他电脑都可以打开展示页面并播放视频。

1. 确认本机 IP：macOS 执行 `ipconfig getifaddr en0`（Wi-Fi）或 `ipconfig getifaddr en1`（有线），Windows 执行 `ipconfig`，Linux 执行 `ip addr`。
2. 其他设备浏览器访问 `http://<本机IP>:3000`，例如 `http://192.168.1.23:3000`。
3. macOS 首次启动时若弹出"是否允许 node 接受传入的网络连接"，请点"允许"；如果曾经点过拒绝，到「系统设置 → 网络 → 防火墙 → 选项」里把 node 改为允许，或临时关闭防火墙。

排查顺序：其他设备连不上时，先在别的设备 `ping <本机IP>` 确认网络互通，再确认终端打印的 `Network` 地址与实际网卡 IP 一致，最后检查防火墙与公司/校园网的客户端隔离（AP 隔离会禁止设备互访）。

如果只需要本机访问（例如连的是公共网络），用 `pnpm run dev:local`，此时只监听 `127.0.0.1`。

生产模式同样监听 `0.0.0.0`：

```bash
pnpm run build
pnpm run start          # 默认监听 0.0.0.0:3000，可用 PORT=8080 pnpm run start 改端口
```

注意：当前 `vinext` 的生产静态文件服务会给 `.mp4` 返回 `application/octet-stream` 且不支持 Range 请求，视频在部分浏览器（如 Safari）里可能无法播放或无法拖动进度。汇报演示请用 `pnpm run dev`（开发服务器的静态文件服务支持 Range 和正确的 MIME 类型，已验证可拖动播放）。

Windows 下把 `./scripts/with-node.sh` 换成直接在支持 Node.js 的终端里执行 `npx vinext dev --hostname 0.0.0.0` 即可。

## 文件系统

```text
autonomous-threat-showcase/
├── vite.config.ts               # Vite 配置（server.host / allowedHosts 控制局域网访问）
├── package.json                 # dev、dev:local、build、start 脚本
├── scripts/with-node.sh         # 启动时自动定位 Node.js
├── app/
│   ├── page.tsx                 # 项目总览与四种方法入口
│   ├── globals.css              # 页面样式
│   ├── layout.tsx               # 页面标题和中文环境
│   ├── components/MethodShowcase.tsx # 四方法共用展示界面
│   └── methods/
│       ├── method-data.ts       # 方法、场景与视频的统一数据
│       ├── scenge/page.tsx
│       ├── drivearena/page.tsx
│       ├── threatrange/page.tsx
│       └── chatscene/page.tsx
├── public/media/methods/
│   ├── M01_SCENGE/              # 28 个视频
│   ├── M02_DriveArena/          # 8 个视频
│   ├── M03_ThreatRange/         # 47 个视频及辅助可视化素材
│   └── M04_ChatScene/           # 2 个视频
└── source-materials/             # 可选的本地原始资料目录，不提交到公开仓库
```

`source-materials` 可在本地保存原始资料，并已通过 `.gitignore` 排除；`public/media` 保存网页直接播放的 H.264 副本。网页里的路径以 `/media/...` 开头，实际对应 `public/media/...`。

## 素材与标签约定

- 方法编号：`M01_SCENGE`、`M02_DriveArena`、`M03_ThreatRange`、`M04_ChatScene`。
- 场景编号：统一使用 `SCN-01` 至 `SCN-15`，英文短名只用小写字母和连字符。
- 场景基础视频放在 `base/`；天气视频放在 `weather/天气类型/`。
- 典型要素标签只能从 `对抗攻击`、`自然噪声`、`边缘场景` 中选择，可以多选。
- 各方法的视频、标签、风险与场景分组统一维护在 `app/methods/method-data.ts`。

## 后续补充视频

1. 将浏览器可播放的 MP4 放入对应方法与场景目录。
2. 在 `app/methods/method-data.ts` 的对应场景中补充视频 `label`、相对 `path` 和 `tags`。
3. 执行 `pnpm run build` 检查页面是否可以正常构建。

当前已接入：4 种生成方法、24 组场景成果、85 个视频。

## 常用命令

```bash
pnpm run dev         # 局域网可访问的开发模式
pnpm run dev:local   # 仅本机访问
pnpm run lint        # 代码检查
pnpm run build       # 生产构建
pnpm run start       # 启动生产构建
pnpm run test        # 当前等同于生产构建检查
```

## GitHub 协作建议

建议保护 `main` 分支，日常修改从功能分支开始，并通过 Pull Request 合并：

```bash
git switch -c feature/简短功能名
# 修改并验证后
git add .
git commit -m "feat: 简要描述修改"
git push -u origin feature/简短功能名
```

协作者首次参与时，先克隆仓库并安装依赖；后续开始修改前执行 `git pull --rebase origin main`。不要提交 `.env*`、依赖目录、构建产物或本地临时文件。

项目包含较多视频和二进制素材。当前文件均未超过 GitHub 100 MB 的单文件限制，但频繁替换视频会快速增大 Git 历史。后续若持续维护大文件，建议在首次提交前统一启用 Git LFS，至少跟踪 `*.mp4` 和 `*.pptx`；如果使用普通 Git 管理媒体，提交前务必检查文件大小。

## 共享前检查

- 原始视频、内部汇报和项目记录统一放在已忽略的 `source-materials/`，不要提交到公开仓库。
- 公开仓库应补充合适的 `LICENSE`；未添加许可证不代表他人可以自由复制、修改或再发布。
- 确认所有媒体素材具备必要的使用与分发授权。
- 不要把账号密码、访问令牌、密钥或包含敏感信息的 `.env` 文件提交到仓库。

## 贡献方式

欢迎通过 Issue 记录问题或需求，通过 Pull Request 提交修改。提交前请至少执行：

```bash
pnpm run lint
pnpm run build
```
