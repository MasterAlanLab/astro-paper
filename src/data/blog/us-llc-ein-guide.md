---
author: 艾伦
pubDatetime: 2026-11-14T12:00:00+08:00
title: 放弃怀俄明，我选了年维护费只要 $35 的新墨西哥州：2026 美国 LLC + 免费 EIN 完整实操
featured: false
draft: false
categories:
  - 工具与资源
tags:
  - 创业
  - 教程
description: 美国 LLC 注册与免费申请 EIN 的操作指南。
---
> **免责声明**：本文记录的是我在 2026 年以中国大陆居民、无 SSN/ITIN 的身份，全程 DIY 注册 New Mexico LLC 并向 IRS 申请 EIN 的真实经历。美国各州政策、IRS 表格版本及第三方服务价格随时可能调整，实际操作时请以各官方网站的最新要求为准。内容仅作经验分享，不构成任何法律、税务或会计建议。

---

## 前言

准备出海做独立开发、SaaS、App 或者跨境独立站的朋友，大概率都动过注册一家美国公司的念头。有了美国公司，后续去申请 Stripe、开美国商业银行账户、注册企业级开发者账号都会顺理成章很多。当然先泼盆冷水：美国 LLC 只是一块敲门砖，并不代表有了公司就 100% 能过 Stripe 或银行审核，最终还是得过各家平台自己的 KYC 和风控关。

我之前也打算弄一个。最开始去淘宝、拼多多问了一圈代办，注册一家美国 LLC 基本报价都在 **1800 元人民币**左右。后来转念一想，美国州政府本来就提供在线注册通道，无非就是填几张英文表格，流程能有多玄乎？干脆自己动手试试。

折腾下来，我成功注册了自己的新墨西哥州公司——**Avalon Labs LLC**，紧接着又自己填好 Form SS-4，通过网络传真向 IRS 免费拿到了 EIN。如果你也是中国大陆个人、没有 SSN 和 ITIN，想低成本自己走通整套流程，下面这份踩坑与实操记录应该能帮你省下不少摸索时间。

---

## 一、为什么选新墨西哥州，而不是怀俄明州？

首先要理清一个基本概念：美国并没有所谓的“联邦公司”，LLC（Limited Liability Company，有限责任公司）都是依据具体某个州的法律成立的。你注册的是 Wyoming LLC、Delaware LLC 或者 New Mexico LLC，公司获批后，再去向联邦层面的美国国税局（IRS）申请 EIN。

中文互联网上讨论最多的是怀俄明州（Wyoming）。怀俄明州确实不错，但并非零维护成本——除了每年的注册代理人（Registered Agent）费用外，它还有强制的年度报告（Annual Report）和最低年费。我起初也盯着怀俄明州看，后来反复对比研究了一番，发现对个人开发者或小型软件/SaaS 业务来说，新墨西哥州（New Mexico）在性价比上要香得多：

1. **州政府注册费极低**：新墨西哥州 Domestic LLC 的 `Articles of Organization` 申请费只要 **$50**。
2. **州层面没有常规年报**：截至目前，普通的 New Mexico LLC 不需要像很多州那样每年向州务卿提交 Annual Report 或 Biennial Report。这意味着在州政府这一层，你几乎没有每年的固定行政维护开支。
3. **注册代理人便宜**：我找了一家专门做新墨西哥州代理的服务商（`newmexicoregisteredagent.com`），价格是 **$35 / 年**。

把这几笔账加在一起，我成立这家公司的实际硬件成本是：
**$50（州注册费）+ $1.95（在线刷信用卡的 Convenience Fee）+ $35（首年注册代理人）= $86.95**（不含发传真申请 EIN 的零星费用）。从第二年开始，如果没有特殊业务或州税义务，维持公司存续的最低固定支出就只剩下 **$35 / 年**的注册代理人续费。

不过这里必须提前把丑话说在前面：**“新墨西哥州没有 LLC 年报”绝对不等于“外国人注册完每年什么都不用管”**。州政府不管你，联邦国税局（IRS）还得管，关于 Form 5472 的税务申报坑，我在后面会单独重点讲。

---

## 二、动手前需要准备什么？

正式开始填表之前，先把下面这 6 样东西备齐，免得填到一半卡壳：

1. **想好公司名称（先查重，再买代理）**
我的公司最终定名为 **Avalon Labs LLC**。新墨西哥州法律规定，LLC 名称必须包含 `LLC`、`L.L.C.`、`Limited Liability Company` 或 `LC` 等标识，且不能与州内已注册企业重名。建议先去新墨西哥州务卿官网的 Business Search 查一下名字是否可用，**确认能用之后再去买 Registered Agent**，确保从一开始两边填写的公司全称一字不差（我就在这里栽了跟头）。
2. **一个真实的中国大陆地址**
注册时需要填写 `Principal Place of Business Address`（主要营业地址）和 `Business Mailing Address`（商业通信地址）。我两项都直接填了自己的中国大陆地址，州务卿正常受理并批准了，没有强制要求填美国地址。注意不要把你自己的营业地址和 Registered Agent 的地址混为一谈。
3. **New Mexico Registered Agent（注册代理人）**
这是州法律硬性要求的，必须有一个位于新墨西哥州境内的法定代理人用来接收法律文书。我在 `newmexicoregisteredagent.com` 购买后（$35/年），后台会给出具体的**法定代理实体名称和地址**——注意，填州务卿表格时要用后台提供的法定实体名，别直接填网站品牌名。
4. **长期稳定的邮箱和手机号**
州务卿审核通知、代理人转信、IRS 文件以及后续开银行和 Stripe 全靠邮箱联络，务必用自己长期维护的常用邮箱。
5. **支持美元支付的银行卡**
州务卿系统支持直接刷卡交费（Visa/Mastercard 等均可），$50 州费外加 $1.95 手续费。
6. **可以收发美国传真的网络传真服务**
因为我是中国大陆居民，既没有 SSN 也没有 ITIN，主营业地又不在美国，无法直接走 IRS 的普通在线申请通道，传真 Form SS-4 是免费拿 EIN 最稳妥的路子。我用的是 **Dropbox Fax**，只要能正常往美国号码发传真、并能接收回传即可。

---

## 三、真实注册成本清单

| 费用项目 | 我的实际支出 | 备注说明 |
| --- | --- | --- |
| New Mexico LLC 州注册费 | **$50** | 州务卿官网在线支付 |
| 信用卡支付手续费 | **$1.95** | Credit Card Convenience Fee |
| Registered Agent（注册代理人） | **$35 / 年** | `newmexicoregisteredagent.com` |
| IRS 申请 EIN | **$0** | **IRS 官方完全免费** |
| 网络传真服务 | 视所选平台而定 | 仅用于向 IRS 发送和接收 SS-4 |
| **第一年公司成立基础总成本** | **$86.95 + 传真费** | 远低于市面 1800 元左右的代办价 |
| **第二年起最低固定维护成本** | **$35 / 年** | 主要是 Registered Agent 续费 |

这里顺便打破一个信息差：**IRS 申请 EIN 本身是 $0 免费的**。市面上代办动辄收几百上千人民币，收的是帮你填表、发传真和处理杂务的人工费，不是政府规费。

---

## 四、新墨西哥州 LLC 完整注册步骤

### 第一步：购买 Registered Agent（顺便说下我踩的最大一坑）

先在 `newmexicoregisteredagent.com` 下单购买一年的服务（$35），买完就能在后台看到代理人的详细法定信息。

**血泪教训预警**：我一开始在代理商后台填公司名字时，随手只写了 `Avalon Labs`，漏掉了后面的 `LLC`；而我在州务卿系统里提交的正式名称是 `Avalon Labs LLC`。当时没当回事，结果代理商给我生成的签署文件（Statement of Acceptance）上印的也是 `Avalon Labs`。州务卿审核时直接把我的申请打回来要求补正，理由很明确：**代理人接受任命书上的公司名称，必须与 Articles of Organization 第一条里的公司全称完全一致。**

所以切记，从头到尾所有地方的 Legal Company Name 必须一模一样——该写 `Avalon Labs LLC` 就全都写 `Avalon Labs LLC`，不要漏掉 `LLC`，也不要自己随意加逗号变成 `Avalon Labs, LLC`。后来我联系代理商客服改了后台名称，让他们重新签发了一份 PDF 重新上传，这才顺利通过。

### 第二步：注册州务卿账号，选对公司类型

打开新墨西哥州务卿企业系统 `enterprise.sos.nm.gov`，注册账号登录后，依次点击 `Forms` → `Business`，找到 **`Domestic LLC Articles of Organization`**。

这里有个新手极易搞混的概念：**我是中国人，公司也归外国人所有，为什么选 Domestic LLC 而不是 Foreign LLC？**
在美国公司法语境里，Domestic 和 Foreign 划分的是“公司的出生地”，跟老板拿哪国护照毫无关系。你现在是在新墨西哥州新成立一家公司，它对新墨西哥州而言就是本土公司（Domestic LLC）；只有当你在怀俄明州或特拉华州已经注册好了一家 LLC，现在想来新墨西哥州跨州经营登记时，才叫 Foreign LLC。

### 第三步：填写公司名称

* **Company Name**：`Avalon Labs LLC`
* **A previously filed reserved name will be used**：`No`（如果没有提前花钱做名称预留）
* **Is the name proposed to do business in New Mexico different than the registered LLC name?**：`No`

### 第四步：填写 Business Contact Information

`Principal Place of Business Address` 和 `Business Mailing Address` 我都填了同一个真实的中国大陆地址，Country 选择 `China`。

由于州务卿系统的表单主要是按美国地址格式设计的，选了 `China` 之后，国外地址字段的体验比较生硬。我的做法是把 **District（区/县）、City（市）、Province（省）以及 Postal Code（邮编）全部组合写进 Address Line 里**，最终系统正常接受了。

关于隐私顺便提一句：我获批后去官网的 Public Business Search 搜过自己的公司，首页摘要里并没有直接把我的中国地址露出来；但如果你去调取完整的 `Articles of Organization` 备案文件，里面是包含这个地址的。所以它只是“不直接在搜索首页裸奔”，并非绝对意义上的完全隐身。

### 第五步：关联 Registered Agent 并上传接受书

进入 `Registered Agent and Registered Office Address` 页面，直接在搜索框里检索代理商后台给你的法定实体名称，选中即可。

紧接着系统会要求上传 **`Statement of Acceptance of Appointment by Designated Initial Registered Agent`**（注册代理人接受任命声明）。这份签名版 PDF 需要找你的 Registered Agent 客服索取或直接在后台下载。上传前再次睁大眼睛核对一遍：PDF 里的公司名是不是完整带 `LLC` 的！

### 第六步：Duration and Purpose（存续期与经营范围）

* **Duration**：选 `Perpetual`（永久存续）。
* **Purpose Statement**：直接留空。做软件开发、App 和 SaaS 业务，没必要在章程里自己给自己画地为牢。

### 第七步：Optional Articles（附加条款）

按一人公司的实际情况勾选即可：

* **Single Member LLC**：`Yes`
* **Manager Managed**：`No`（不额外聘请经理人，由唯一成员自己管理）
* **Member 信息是否公开添加**：`No`
* **Additional Articles**：`Not Applicable`
* **Effective Date**：`When filed by the Secretary of State`

### 第八步：Organizer（组织者）

公司是我自己注册的，Organizer 就填我自己。填写时我发现这个页面的地址栏强制校验美国地址格式，中国邮编输进去会被强行识别并报错成美国 ZIP 格式。好在 Organizer 的地址并不是必填项，我索性只填了 `Organizer` 和我的英文姓名，地址栏直接留空，最后也正常获批了。

### 第九步：签名与在线交费

`Signer’s Capacity` 选择 `Self`，签上自己的英文姓名和日期，勾选下方的几项合规声明（知晓信息公开属性、有权提交、保证信息真实等），点击 `File Online` 刷卡付款，提交完成。

### 我的实际审核时间线

* **10 月 8 日**：首次在线提交申请
* **10 月 14 日**：收到州务卿通知 `Needs Correction`（就是前面提到的代理人文件少了 `LLC`）
* **10 月 15 日**：让代理商重出文件并重新提交
* **10 月 21 日**：状态正式变为 `Approved`（最终 Certificate of Organization 上显示的成立生效日期为 **2026 年 10 月 15 日**）

所以如果中途收到 `Needs Correction` 千万别慌，这不代表被拒了。去 `My Business Work Queue` 里下载官方的 Correction Letter，看清楚具体哪一项不符合规范，在规定期限内改好重交就行。

---

## 五、没有 SSN / ITIN，如何免费向 IRS 申请 EIN？

公司批下来之后，下一步就是拿联邦税号 **EIN（Employer Identification Number）**。虽然字面意思是“雇主识别号”，但哪怕你一个员工都没有，只要你想开美国商业银行账户、接 Stripe、填 W-8/W-9 税务表格或者做企业认证，都离不开它。

国内很多中介喜欢制造焦虑，说外国人没有美国 SSN 或 ITIN 就办不了 EIN，必须先花几千块找他们办 ITIN。**这是纯粹的误导。** 根据 IRS 官方的内部操作指引，如果外籍负责人（Foreign Responsible Party）既没有、也不符合申请 SSN/ITIN 的条件，在填写申请表 **Form SS-4 的 Line 7b 时，直接填写 `Foreign`（或 `N/A`）即可**。我就是纯大陆身份、无 SSN 无 ITIN，直接传真拿下的 EIN。

### 第一步：去 IRS 官网下载最新版 Form SS-4

直接去 IRS 官方网站搜索下载 `Form SS-4 (Application for Employer Identification Number)` 的最新 PDF，千万别图省事去随便下载某个博客几年前存档的旧表格。

### 第二步：Form SS-4 逐行填写参考

下面是我最终提交并成功下号的填法，供同样是“中国个人独资单成员 LLC”的朋友对照参考：

* **Line 1（Legal name of entity）**：`Avalon Labs LLC`（必须与州务卿文件一字不差）
* **Line 4a / 4b（Mailing address）**：填写 Registered Agent 提供的美国通信地址
* **Line 5a / 5b（Street address / Physical address）**：填写你的中国大陆实际经营地址
* **Line 6（County and state where principal business is located）**：填写中国实际所在地，比如我的填法是 `Xuyong County, Sichuan, China`
* **Line 7a（Name of responsible party）**：填你自己的英文姓名
* **Line 7b（SSN, ITIN, or EIN）**：直接填 **`Foreign`**
* **Line 8a（Is this application for an LLC?）**：`Yes`
* **Line 8b（Number of LLC members）**：`1`
* **Line 8c（Was the LLC organized in the United States?）**：`Yes`（注意：虽然你是中国人，但这家 LLC 是在美国新墨西哥州成立的，所以这里必须是 Yes）
* **Line 9a（Type of entity）**：勾选 `Other`，在旁边注明 `Foreign-owned U.S. disregarded entity – Form 5472`
* **Line 10（Reason for applying）**：勾选 `Other`，填写 `Foreign-owned U.S. disregarded entity filing Form 5472`
* **Line 11（Date business started or acquired）**：填写公司实际成立/开始日期
* **Line 12（Closing month of accounting year）**：`December`（按自然年计算）
* **Line 13（Highest number of employees expected in the next 12 months）**：全部填 `0`
* **Line 15（First date wages or annuities were paid）**：`N/A`
* **Line 16（Check one box that best describes the principal activity）**：勾选 `Other`，填写 `Software Development`
* **Line 17（Indicate principal line of merchandise sold...）**：填写 `Software development, mobile apps and SaaS`
* **Line 18（Has the applicant entity shown on line 1 ever applied for and received an EIN?）**：`No`
* **底部签名区**：写上你的英文姓名，Title 填 **`Sole Member`**，手写或电子签字，填上日期、联系电话，以及你用来接收回传的 **Reply Fax Number**。

### 第三步：通过网络传真发送给 IRS

填好表格并导出为 PDF 后，打开你准备好的网络传真服务（我用的是 Dropbox Fax）。对于主要营业地点位于美国境外的国际申请人，IRS 官方指定的接收传真号码是：
**`+1 304-707-9471`**

发送时记得在表单底部填好你的接收传真号，方便 IRS 审核通过后直接把分配好 EIN 的 SS-4 首页回传给你。

### 第四步：坐等下号

官方说法是传真申请一般几个工作日出结果，赶上旺季可能会慢一些。我自己的实际进度非常丝滑：

* **10 月 28 日**：发传真提交 Form SS-4
* **11 月 2 日**：IRS 文件显示已正式分配 EIN，随后我的网络传真就收到了回传通知单，整个过程没花一分钱官费。

---

## 六、几个最常被问到的问题

**1. 中国大陆居民真的能 100% 持有美国 LLC 吗？**
完全可以。我就是中国大陆居民，100% 持有这家 New Mexico Single-Member LLC，全程没有任何环节要求必须有美国籍股东或合伙人。

**2. Registered Agent 的地址能直接拿来当公司办公/开户地址吗？**
千万别默认可以。你花 $35 买的 Registered Agent 服务，核心职责只是帮你接收州政府的官方信件和法院传票。如果你想把代理人的地址拿去当日常收发商业信件的 Mailing Address、银行开户地址甚至虚拟办公室，必须提前看清服务商条款——很多平台会把 `Mail Scanning`、`Business Address` 或 `Virtual Mailbox` 拆出来单独收费。

**3. 拿到了美国 LLC 和 EIN，是不是就能稳过 Stripe 了？**
不是。公司和税号只是准入门槛，Stripe 和美国商业银行在审核时，还会综合评估实际控制人身份（护照等 KYC 资料）、业务网站合规性、具体经营类目、交易风险以及资金流水。千万别迷信“有了美国公司就能无脑开 Stripe”。

**4. 申请 EIN 有必要花钱找代办吗？**
如果你的股权架构和我一样简单（单人独资、外籍唯一成员、无美国雇员、业务清晰），自己花半小时研究填一下 Form SS-4 完全足够，毕竟 IRS 自己不收钱。但如果你涉及多人合伙、复杂股权架构或者境内实体控股，那还是建议直接付费找专业会计师或税务师处理。

---

## 七、公司下来后的维护与合规（千万别踩雷）

把 LLC 和 EIN 拿到手只是第一步，后面这几件事如果疏忽了，轻则账号受限，重则面临天价罚款：

1. **每年记得续费 Registered Agent**
每年 $35 的代理人费用按时交，保持公司处于 Active（正常存续）状态。如果中途换了代理商，一定要同步去新墨西哥州务卿系统里提交变更。
2. **重中之重：NM 州没年报 ≠ 联邦不用报税（警惕 $25,000 罚款）**
这是整篇文章最需要划重点的地方。新墨西哥州虽然豁免了州层面的常规年报，但只要你是由外国人 100% 持有的美国 Single-Member LLC，在联邦税务分类上默认属于 **Foreign-owned U.S. Disregarded Entity**。
根据 IRS 现行规定，这类实体只要在纳税年度内与外国关联方（包括你作为唯一所有人在内的资金往来、注资、垫付费用等）发生过可报告交易，哪怕公司一分钱收入都没有，每年也必须向 IRS 提交 **Pro Forma Form 1120 + Form 5472**。
一旦漏报或严重错报，IRS 的初始罚款就是 **$25,000 起步**，收到通知后若继续拖延不补报还会叠加处罚。所以千万别因为贪图新墨西哥州“没有年报”，就误以为每年可以彻底躺平不管。
3. **把所有关键文件归档备份好**
我把注册全流程下来的 9 份核心文件全部按类别建档保存了，后续开商业银行账户、申请 Stripe、认证 Apple Developer 或 Google Play 企业账号时随时要调取：
* Certificate of Organization
* Articles of Organization
* Notice of Filing Approval
* Registered Agent Acceptance
* 州政府付款 Receipt
* Form SS-4 申请表留底
* EIN Assignment Notice（IRS 回传确认件）
* 后续 IRS 税务往来文件
* Operating Agreement


4. **公司信息有变动及时向州政府报备**
日后如果改了公司名称、换了注册代理人、搬了营业地址或者调整了管理方式，记得按规定向新墨西哥州务卿提交 Amendment 变更申请，不要只在银行或代理商后台改一下就完事。
5. **自己准备一份 Operating Agreement（运营协议）**
虽然一人公司（Single-Member LLC）在向州务卿提交注册时不需要上传运营协议，但日后去美国银行开户、过平台 KYC 审核时，对方经常会要求你提供这份文件，用来证明公司的所有权归属和内部治理结构。

---

## 写在最后

整套流程自己跑通之后，最大的感受就是：在信息透明的今天，注册一家基础的美国 LLC 远没有代办机构渲染得那么神秘。回顾一下我的全套路径：

`查名确定名称` → `购买 $35 Registered Agent` → `新墨西哥州务卿官网提交申请` → `支付 $50 州费（+$1.95 手续费）` → `处理一次补正后获批` → `填写 Form SS-4` → `网络传真发往 IRS` → `免费拿到 EIN`

相比最初问到的 1800 元代办报价，自己动手只花了 **$86.95 加上一点传真费**就把架子搭了起来，后续每年的州层面固定支出也只要 **$35**。省钱之外，最大的收获其实是把每个字段的含义、Domestic 与 Foreign 的区别、SS-4 的逻辑以及 Form 5472 的合规红线彻底摸清了——这些底层认知在后面跟银行和支付机构打交道时非常管用。

接下来，我还会拿着这家 Avalon Labs LLC 去实际测试**美国商业银行开户、Stripe 接入、Apple / Google 企业开发者账号申请**，以及明年的 **Form 5472 / 1120 实际申报**。等这些环节一一跑通后，我再把具体的实操和费用明细更新出来。

最后再啰嗦一句：低注册成本只是出海的第一步，一旦公司开始产生真实收入和跨境资金往来，务必找熟悉外国人持股美国 LLC 的美国注册会计师（CPA）或注册税务师（EA）确认每年的报税细节，切勿在合规问题上因小失大。