# claude-switch

一键切换 Claude Code 使用的 API 提供商（DeepSeek、GLM 等）。

## 安装

```bash
git clone https://github.com/XvarX/ai_switchmodel.git
cd ai_switchmodel
sh install.sh        # Linux / macOS
```

Windows PowerShell：

```powershell
.\install.ps1
```

安装后运行 `. ~/.bashrc`（Linux）或重启终端（Windows）。

## 使用

### 添加提供商

```bash
cs add ds
```

交互式引导填写：

```
  Adding provider: ds

  API Base URL: https://api.deepseek.com/anthropic
  API Key: sk-xxxxx
  Model name [deepseek-chat]: deepseek-v4-pro[1m]
  Opus model name (empty = same as Model):
  Sonnet model name (empty = same as Opus):
  Haiku model name (empty = same as Sonnet):
```

模型名支持级联：Opus 不填沿用 Model，Sonnet 不填沿用 Opus，Haiku 不填沿用 Sonnet。大部分情况填完 Model 后连按回车就行。

也可以一行搞定：

```bash
cs add ds --url https://api.deepseek.com/anthropic --key sk-xxxxx
```

添加完成后运行 `. ~/.bashrc`（Linux）或重启终端（Windows）。

### 切换提供商

```bash
use_ds        # 切到 DeepSeek
use_glm       # 切到 GLM
```

### 其他命令

```bash
cs list           # 查看所有已配置的提供商
cs remove <name>  # 删除提供商
cs init           # 重新生成 shell 函数（通常不需要手动运行）
cs help           # 查看帮助
```

### 卸载

```bash
sh uninstall.sh        # Linux / macOS
```

```powershell
.\uninstall.ps1        # Windows
```

## 设置的环境变量

每个提供商切换时会设置以下环境变量：

| 变量 | 说明 |
|------|------|
| `ANTHROPIC_BASE_URL` | API 地址 |
| `ANTHROPIC_AUTH_TOKEN` | API Key |
| `ANTHROPIC_MODEL` | 默认模型名 |
| `ANTHROPIC_DEFAULT_SONNET_MODEL` | Sonnet 模型名 |
| `ANTHROPIC_DEFAULT_HAIKU_MODEL` | Haiku 模型名 |
| `ANTHROPIC_DEFAULT_OPUS_MODEL` | Opus 模型名 |

## 注意事项

- 如果你在 `~/.claude/settings.json` 的 `env` 字段里硬编码了 API 相关变量，需要删掉，否则会覆盖 `use_xxx` 设置的值
- 配置文件存储在 `~/.claude-switch.json`
- 支持 Bash、Zsh、PowerShell、CMD
- 零外部依赖，纯 Node.js 内置模块

## License

MIT
