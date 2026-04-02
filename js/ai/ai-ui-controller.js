/**
 * AIUIController - AIパネルのUI制御とジェネレーターとの統合
 * サイドバーにAIアシスタントパネルを動的レンダリングし、
 * AIService / AIPromptEngine / AIStreamHandler と連携する
 */
class AIUIController {
  // プリセットプロンプト定義（業種別）
  static PRESETS = [
    { id: 'medical-saas', label: '医療SaaS', prompt: '医療従事者向けSaaSのランディングページ。信頼感・清潔感のあるデザインで、HIPAA準拠やセキュリティを訴求' },
    { id: 'ec-site', label: 'ECサイト', prompt: 'ECサイトのランディングページ。商品の魅力を最大限に引き出す写真中心レイアウト、購入CVR重視' },
    { id: 'education', label: '教育', prompt: 'オンライン教育プラットフォームのLP。学習体験の可視化、受講者の声、料金プラン比較を含む' },
    { id: 'btob', label: 'BtoB', prompt: 'BtoB向けSaaS/サービスのLP。導入実績・ROI・機能比較・資料請求CTAを重視した構成' },
    { id: 'japanese', label: '和風', prompt: '和風・日本文化をテーマにしたLP。縦書き風アクセント、和カラーパレット、余白を活かしたデザイン' },
    { id: 'fintech', label: 'フィンテック', prompt: 'フィンテック/金融サービスのLP。セキュリティ・透明性・数値実績を強調、ダークモード対応' },
    { id: 'restaurant', label: '飲食', prompt: '飲食店・レストランのLP。料理写真を大きく使い、メニュー・アクセス・予約CTAを分かりやすく配置' },
    { id: 'realestate', label: '不動産', prompt: '不動産・住宅のLP。物件ギャラリー、間取り図、エリア情報、問い合わせフォームを含む構成' },
  ];

  // タスク定義
  static TASKS = [
    { id: 'customize', label: 'カスタマイズ', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9" stroke-linecap="round" stroke-linejoin="round"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
    { id: 'generate', label: '新規生成', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19" stroke-linecap="round"/><line x1="5" y1="12" x2="19" y2="12" stroke-linecap="round"/></svg>' },
    { id: 'fullpage', label: 'フルページ', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" stroke-linecap="round" stroke-linejoin="round"/><line x1="3" y1="9" x2="21" y2="9" stroke-linecap="round"/><line x1="3" y1="15" x2="21" y2="15" stroke-linecap="round"/></svg>' },
    { id: 'design-system', label: 'デザイン', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
    { id: 'review', label: 'レビュー', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
  ];

  constructor(generator, type = 'lp') {
    this.generator = generator;
    this.type = type; // 'lp' | 'dashboard'
    this.service = new AIService();
    this.promptEngine = typeof AIPromptEngine !== 'undefined' ? new AIPromptEngine() : null;
    this.streamHandler = typeof AIStreamHandler !== 'undefined' ? new AIStreamHandler() : null;
    this.isGenerating = false;
    this.currentTask = 'customize';
    this.currentPreset = null;
    this._pendingResult = null;
    this._pendingTaskType = null;
    this._targetSectionId = null;
  }

  // === 初期化 ===
  init() {
    this._renderAIPanel();
    this._renderSettingsModal();
    this._setupEventListeners();
    this._updateUIState();
  }

  // =========================================
  // パネルレンダリング
  // =========================================

  /** サイドバー内にAIアシスタントセクションを挿入 */
  _renderAIPanel() {
    const sidebar = this.type === 'lp'
      ? document.getElementById('controlsPanel')
      : document.getElementById('leftSidebar');
    if (!sidebar) return;

    const aiSection = document.createElement('div');
    aiSection.className = 'ai-section';
    aiSection.id = 'aiPanel';

    // タスクボタンHTML
    const taskButtonsHTML = AIUIController.TASKS.map(t =>
      `<button class="ai-task-btn${t.id === this.currentTask ? ' active' : ''}" data-task="${t.id}" title="${t.label}">${t.icon}<span>${t.label}</span></button>`
    ).join('');

    // プリセットチップHTML
    const presetsHTML = AIUIController.PRESETS.map(p =>
      `<button class="ai-preset-chip" data-preset="${p.id}">${p.label}</button>`
    ).join('');

    // セクション選択（LP用）
    const targetSelectHTML = this.type === 'lp' ? `
      <select class="ai-target-select" id="aiTargetSection">
        <option value="">対象セクションを選択...</option>
      </select>
    ` : '';

    aiSection.innerHTML = `
      <div class="ai-section-header">
        <svg class="ai-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 2a4 4 0 0 1 4 4v1a3 3 0 0 1 3 3v1a3 3 0 0 1-3 3h-1l-3 4-3-4H8a3 3 0 0 1-3-3v-1a3 3 0 0 1 3-3V6a4 4 0 0 1 4-4z" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="9" cy="10" r="1" fill="currentColor"/>
          <circle cx="15" cy="10" r="1" fill="currentColor"/>
        </svg>
        <h3 class="ai-section-title">AI アシスタント</h3>
        <span class="ai-badge">Beta</span>
      </div>

      <!-- API未設定時のバナー -->
      <div class="ai-setup-banner" id="aiSetupBanner">
        <p>AIアシスタントを利用するにはAPI設定が必要です</p>
        <button class="ai-settings-btn" id="aiOpenSettingsFromBanner">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9" stroke-linecap="round" stroke-linejoin="round"/></svg>
          API設定
        </button>
      </div>

      <!-- AI操作パネル（API設定済み時のみ表示） -->
      <div class="ai-controls" id="aiControls" style="display:none;">
        <!-- ステータス -->
        <div class="ai-status" id="aiStatus">
          <span class="ai-status-dot" id="aiStatusDot"></span>
          <span id="aiStatusText">未接続</span>
          <button class="ai-settings-btn" id="aiOpenSettings" style="margin-left:auto;padding:2px 8px;font-size:11px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/></svg>
            設定
          </button>
        </div>

        <!-- タスク選択 -->
        <div class="ai-task-grid" id="aiTaskGrid">
          ${taskButtonsHTML}
        </div>

        <!-- 対象セクション -->
        ${targetSelectHTML}

        <!-- プロンプト入力 -->
        <div class="ai-prompt-area">
          <textarea class="ai-prompt-textarea" id="aiPrompt" placeholder="AIへの指示を入力してください...&#10;例: ヒーローセクションをより洗練されたデザインに変更" rows="4"></textarea>
          <span class="ai-prompt-char-count" id="aiCharCount">0</span>
        </div>

        <!-- プリセット -->
        <div class="ai-presets-row" id="aiPresets">
          ${presetsHTML}
        </div>

        <!-- 生成ボタン -->
        <button class="ai-generate-btn" id="aiGenerateBtn" disabled>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10"/></svg>
          生成
        </button>

        <!-- ストリーミング進捗 -->
        <div class="ai-progress" id="aiProgress">
          <div class="ai-progress-header">
            <span class="ai-progress-label"><span class="ai-pulse-dot"></span>生成中...</span>
            <button class="ai-progress-cancel" id="aiCancelBtn">中止</button>
          </div>
          <div class="ai-progress-bar"></div>
          <span class="ai-progress-text" id="aiProgressText"></span>
        </div>

        <!-- 生成結果の承認UI -->
        <div class="ai-result-actions" id="aiResultActions">
          <span class="ai-result-label">生成結果を確認してください</span>
          <div class="ai-result-buttons">
            <button class="ai-result-btn approve" id="aiApproveBtn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12" stroke-linecap="round" stroke-linejoin="round"/></svg>
              承認
            </button>
            <button class="ai-result-btn retry" id="aiRetryBtn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10" stroke-linecap="round" stroke-linejoin="round"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" stroke-linecap="round" stroke-linejoin="round"/></svg>
              やり直し
            </button>
            <button class="ai-result-btn insert" id="aiInsertBtn" style="display:none;">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19" stroke-linecap="round"/><line x1="5" y1="12" x2="19" y2="12" stroke-linecap="round"/></svg>
              挿入
            </button>
          </div>
        </div>
      </div>
    `;

    sidebar.appendChild(aiSection);
  }

  /** body末尾にAPI設定モーダルを挿入 */
  _renderSettingsModal() {
    if (document.getElementById('aiSettingsModal')) return;

    // プロバイダオプション
    const providerOptions = Object.entries(AIService.PROVIDERS).map(([key, p]) =>
      `<option value="${key}">${p.name}</option>`
    ).join('');

    const modal = document.createElement('div');
    modal.className = 'ai-modal-overlay';
    modal.id = 'aiSettingsModal';
    modal.innerHTML = `
      <div class="ai-modal">
        <div class="ai-modal-header">
          <h2 class="ai-modal-title">AI プロバイダ設定</h2>
          <button class="ai-modal-close" id="aiModalClose">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18" stroke-linecap="round"/><line x1="6" y1="6" x2="18" y2="18" stroke-linecap="round"/></svg>
          </button>
        </div>

        <div class="ai-form-group">
          <label class="ai-form-label" for="aiProvider">プロバイダ</label>
          <select class="ai-form-select" id="aiProvider">
            <option value="">選択してください</option>
            ${providerOptions}
          </select>
        </div>

        <div class="ai-form-group" id="aiApiKeyGroup">
          <label class="ai-form-label" for="aiApiKey">APIキー</label>
          <input class="ai-form-input" type="password" id="aiApiKey" placeholder="sk-..." autocomplete="off" />
          <p class="ai-form-hint">キーはブラウザ内にのみ保存され、外部に送信されません</p>
        </div>

        <div class="ai-form-group">
          <label class="ai-form-label" for="aiModel">モデル</label>
          <select class="ai-form-select" id="aiModel">
            <option value="">プロバイダを先に選択</option>
          </select>
        </div>

        <div class="ai-form-group" id="aiOllamaGroup" style="display:none;">
          <label class="ai-form-label" for="aiOllamaEndpoint">Ollama エンドポイント</label>
          <input class="ai-form-input" type="url" id="aiOllamaEndpoint" value="http://localhost:11434" />
        </div>

        <div class="ai-form-group">
          <button class="ai-test-btn" id="aiTestConnection">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke-linecap="round" stroke-linejoin="round"/><polyline points="22 4 12 14.01 9 11.01" stroke-linecap="round" stroke-linejoin="round"/></svg>
            接続テスト
          </button>
          <span class="ai-test-result" id="aiTestResult"></span>
        </div>

        <div class="ai-form-group">
          <label class="ai-form-label">保存方法</label>
          <div class="ai-storage-options">
            <label class="ai-storage-option">
              <input type="radio" name="aiStorage" value="local" checked />
              ローカル保存（次回も使用）
            </label>
            <label class="ai-storage-option">
              <input type="radio" name="aiStorage" value="session" />
              セッションのみ
            </label>
          </div>
        </div>

        <div class="ai-modal-footer">
          <button class="ai-modal-cancel" id="aiModalCancelBtn">キャンセル</button>
          <button class="ai-modal-save" id="aiModalSaveBtn">保存</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
  }

  // =========================================
  // イベントリスナー
  // =========================================

  _setupEventListeners() {
    // 設定モーダルを開く
    const openSettingsBanner = document.getElementById('aiOpenSettingsFromBanner');
    const openSettings = document.getElementById('aiOpenSettings');
    if (openSettingsBanner) openSettingsBanner.addEventListener('click', () => this._openSettingsModal());
    if (openSettings) openSettings.addEventListener('click', () => this._openSettingsModal());

    // モーダル閉じる
    const modalClose = document.getElementById('aiModalClose');
    const modalCancel = document.getElementById('aiModalCancelBtn');
    if (modalClose) modalClose.addEventListener('click', () => this._closeSettingsModal());
    if (modalCancel) modalCancel.addEventListener('click', () => this._closeSettingsModal());

    // オーバーレイクリックで閉じる
    const overlay = document.getElementById('aiSettingsModal');
    if (overlay) overlay.addEventListener('click', (e) => {
      if (e.target === overlay) this._closeSettingsModal();
    });

    // プロバイダ変更
    const providerSelect = document.getElementById('aiProvider');
    if (providerSelect) providerSelect.addEventListener('change', (e) => this._onProviderChange(e.target.value));

    // 接続テスト
    const testBtn = document.getElementById('aiTestConnection');
    if (testBtn) testBtn.addEventListener('click', () => this._testConnection());

    // 保存
    const saveBtn = document.getElementById('aiModalSaveBtn');
    if (saveBtn) saveBtn.addEventListener('click', () => this._saveSettings());

    // タスク選択
    const taskGrid = document.getElementById('aiTaskGrid');
    if (taskGrid) taskGrid.addEventListener('click', (e) => {
      const btn = e.target.closest('.ai-task-btn');
      if (!btn) return;
      this.currentTask = btn.dataset.task;
      taskGrid.querySelectorAll('.ai-task-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      this._updateTaskUI();
    });

    // プリセット選択
    const presetsRow = document.getElementById('aiPresets');
    if (presetsRow) presetsRow.addEventListener('click', (e) => {
      const chip = e.target.closest('.ai-preset-chip');
      if (!chip) return;
      const preset = AIUIController.PRESETS.find(p => p.id === chip.dataset.preset);
      if (!preset) return;

      // トグル
      if (this.currentPreset === preset.id) {
        this.currentPreset = null;
        chip.classList.remove('active');
        return;
      }
      presetsRow.querySelectorAll('.ai-preset-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      this.currentPreset = preset.id;

      const textarea = document.getElementById('aiPrompt');
      if (textarea) {
        textarea.value = preset.prompt;
        this._updateCharCount();
        this._updateGenerateButton();
      }
    });

    // プロンプト入力
    const textarea = document.getElementById('aiPrompt');
    if (textarea) {
      textarea.addEventListener('input', () => {
        this._updateCharCount();
        this._updateGenerateButton();
      });
    }

    // 生成ボタン
    const generateBtn = document.getElementById('aiGenerateBtn');
    if (generateBtn) generateBtn.addEventListener('click', () => this._executeTask());

    // 中止ボタン
    const cancelBtn = document.getElementById('aiCancelBtn');
    if (cancelBtn) cancelBtn.addEventListener('click', () => this._cancelGeneration());

    // 承認/やり直し/挿入
    const approveBtn = document.getElementById('aiApproveBtn');
    const retryBtn = document.getElementById('aiRetryBtn');
    const insertBtn = document.getElementById('aiInsertBtn');
    if (approveBtn) approveBtn.addEventListener('click', () => this._onApprove());
    if (retryBtn) retryBtn.addEventListener('click', () => this._onRetry());
    if (insertBtn) insertBtn.addEventListener('click', () => this._onInsert());
  }

  // =========================================
  // 設定モーダル操作
  // =========================================

  _openSettingsModal() {
    const modal = document.getElementById('aiSettingsModal');
    if (modal) modal.classList.add('open');

    // 現在の設定を反映
    if (this.service._provider) {
      const providerSelect = document.getElementById('aiProvider');
      if (providerSelect) {
        providerSelect.value = this.service._provider;
        this._onProviderChange(this.service._provider);
      }
      const apiKeyInput = document.getElementById('aiApiKey');
      if (apiKeyInput && this.service._apiKey) apiKeyInput.value = this.service._apiKey;
      const modelSelect = document.getElementById('aiModel');
      if (modelSelect && this.service._model) {
        // モデル一覧更新後に値を設定
        setTimeout(() => { modelSelect.value = this.service._model; }, 100);
      }
    }
  }

  _closeSettingsModal() {
    const modal = document.getElementById('aiSettingsModal');
    if (modal) modal.classList.remove('open');
    const testResult = document.getElementById('aiTestResult');
    if (testResult) testResult.textContent = '';
  }

  _onProviderChange(provider) {
    const apiKeyGroup = document.getElementById('aiApiKeyGroup');
    const ollamaGroup = document.getElementById('aiOllamaGroup');
    const modelSelect = document.getElementById('aiModel');

    // Ollamaの場合はAPIキー不要
    if (apiKeyGroup) apiKeyGroup.style.display = provider === 'ollama' ? 'none' : 'block';
    if (ollamaGroup) ollamaGroup.style.display = provider === 'ollama' ? 'block' : 'none';

    // モデル一覧を更新
    if (modelSelect) {
      modelSelect.innerHTML = '<option value="">読み込み中...</option>';

      if (provider === 'ollama') {
        this.service._provider = 'ollama';
        const endpoint = document.getElementById('aiOllamaEndpoint')?.value || 'http://localhost:11434';
        this.service._ollamaEndpoint = endpoint;
        this.service.getOllamaModels().then(models => {
          if (models.length === 0) {
            modelSelect.innerHTML = '<option value="">モデルが見つかりません</option>';
          } else {
            modelSelect.innerHTML = models.map(m => `<option value="${m.id}">${m.name}</option>`).join('');
          }
        });
      } else if (AIService.PROVIDERS[provider]) {
        const models = AIService.PROVIDERS[provider].models;
        modelSelect.innerHTML = models.map(m => `<option value="${m.id}">${m.name}</option>`).join('');
      } else {
        modelSelect.innerHTML = '<option value="">プロバイダを選択</option>';
      }
    }
  }

  async _testConnection() {
    const resultEl = document.getElementById('aiTestResult');
    if (resultEl) { resultEl.textContent = 'テスト中...'; resultEl.className = 'ai-test-result'; }

    // 一時的に設定を適用
    const provider = document.getElementById('aiProvider')?.value;
    const apiKey = document.getElementById('aiApiKey')?.value;
    const model = document.getElementById('aiModel')?.value;
    const ollamaEndpoint = document.getElementById('aiOllamaEndpoint')?.value;

    if (!provider) {
      if (resultEl) { resultEl.textContent = 'プロバイダを選択してください'; resultEl.className = 'ai-test-result error'; }
      return;
    }

    const tempService = new AIService();
    tempService.configure(provider, apiKey, model, { ollamaEndpoint, sessionOnly: true });

    const result = await tempService.validateConnection();
    if (resultEl) {
      resultEl.textContent = result.message;
      resultEl.className = `ai-test-result ${result.success ? 'success' : 'error'}`;
    }
  }

  _saveSettings() {
    const provider = document.getElementById('aiProvider')?.value;
    const apiKey = document.getElementById('aiApiKey')?.value;
    const model = document.getElementById('aiModel')?.value;
    const ollamaEndpoint = document.getElementById('aiOllamaEndpoint')?.value;
    const sessionOnly = document.querySelector('input[name="aiStorage"][value="session"]')?.checked || false;

    if (!provider) return;

    this.service.configure(provider, apiKey, model, { ollamaEndpoint, sessionOnly });
    this._closeSettingsModal();
    this._updateUIState();

    // ジェネレーターの通知を使用
    if (typeof this.generator.showNotification === 'function') {
      this.generator.showNotification('AI設定を保存しました');
    }
  }

  // =========================================
  // UI状態管理
  // =========================================

  _updateUIState() {
    const banner = document.getElementById('aiSetupBanner');
    const controls = document.getElementById('aiControls');
    const statusDot = document.getElementById('aiStatusDot');
    const statusText = document.getElementById('aiStatusText');

    if (this.service.isConfigured) {
      if (banner) banner.style.display = 'none';
      if (controls) controls.style.display = 'block';
      if (statusDot) statusDot.classList.add('connected');
      if (statusText) statusText.textContent = `${this.service.providerName} / ${this.service.modelName}`;
    } else {
      if (banner) banner.style.display = 'flex';
      if (controls) controls.style.display = 'none';
      if (statusDot) statusDot.classList.remove('connected');
      if (statusText) statusText.textContent = '未接続';
    }

    this._updateGenerateButton();
    this._updateSectionSelect();
  }

  _updateTaskUI() {
    const targetSelect = document.getElementById('aiTargetSection');
    const insertBtn = document.getElementById('aiInsertBtn');
    const prompt = document.getElementById('aiPrompt');

    // customize: 対象セクション選択を表示
    if (targetSelect) targetSelect.style.display = this.currentTask === 'customize' ? 'block' : 'none';
    // generate / fullpage: 挿入ボタンを表示可能にする
    if (insertBtn) insertBtn.style.display = (this.currentTask === 'generate') ? 'flex' : 'none';

    // プレースホルダを変更
    const placeholders = {
      customize: 'セクションの変更内容を指示してください...',
      generate: '新しいセクションの内容を指示してください...',
      fullpage: 'ページ全体のテーマ・構成を指示してください...',
      'design-system': 'デザインの方向性を指示してください（配色・フォント等）...',
      review: 'レビュー観点を指定（空欄でも可）...',
    };
    if (prompt) prompt.placeholder = placeholders[this.currentTask] || '';
  }

  _updateCharCount() {
    const textarea = document.getElementById('aiPrompt');
    const counter = document.getElementById('aiCharCount');
    if (textarea && counter) counter.textContent = textarea.value.length;
  }

  _updateGenerateButton() {
    const btn = document.getElementById('aiGenerateBtn');
    const textarea = document.getElementById('aiPrompt');
    if (!btn) return;

    const hasPrompt = textarea && textarea.value.trim().length > 0;
    const isReview = this.currentTask === 'review';
    btn.disabled = this.isGenerating || (!hasPrompt && !isReview) || !this.service.isConfigured;
  }

  _updateSectionSelect() {
    const select = document.getElementById('aiTargetSection');
    if (!select || this.type !== 'lp') return;

    const sections = this.generator.sections || [];
    select.innerHTML = '<option value="">対象セクションを選択...</option>' +
      sections.map(s => {
        const label = s.template?.name || s.id;
        return `<option value="${s.id}">${label}</option>`;
      }).join('');
  }

  _setGeneratingState(flag) {
    this.isGenerating = flag;
    const progress = document.getElementById('aiProgress');
    const generateBtn = document.getElementById('aiGenerateBtn');
    const resultActions = document.getElementById('aiResultActions');

    if (flag) {
      if (progress) progress.classList.add('active');
      if (resultActions) resultActions.classList.remove('active');
    } else {
      if (progress) progress.classList.remove('active');
    }
    if (generateBtn) generateBtn.disabled = flag;
    this._updateGenerateButton();
  }

  // =========================================
  // AI操作の実行
  // =========================================

  async _executeTask() {
    const prompt = document.getElementById('aiPrompt')?.value?.trim() || '';
    const sectionId = document.getElementById('aiTargetSection')?.value || null;

    try {
      switch (this.currentTask) {
        case 'customize':
          await this.customizeSection(sectionId, prompt);
          break;
        case 'generate':
          await this.generateSection(prompt);
          break;
        case 'fullpage':
          await this.generateFullPage(prompt);
          break;
        case 'design-system':
          await this.generateDesignSystem(prompt);
          break;
        case 'review':
          await this.reviewDesign(prompt);
          break;
      }
    } catch (e) {
      this._setGeneratingState(false);
      const progressText = document.getElementById('aiProgressText');
      if (progressText) progressText.textContent = '';
      if (typeof this.generator.showNotification === 'function') {
        this.generator.showNotification(`AI生成エラー: ${e.message}`, 'error');
      }
    }
  }

  /** セクションのカスタマイズ */
  async customizeSection(sectionId, prompt) {
    if (!sectionId && this.type === 'lp') {
      if (typeof this.generator.showNotification === 'function') {
        this.generator.showNotification('対象セクションを選択してください', 'warning');
      }
      return;
    }

    this._setGeneratingState(true);
    this._targetSectionId = sectionId;
    const progressText = document.getElementById('aiProgressText');

    // 現在のセクションHTMLを取得
    let currentHTML = '';
    if (this.type === 'lp') {
      const section = this.generator.sections.find(s => s.id === sectionId);
      if (section) currentHTML = section.template.html;
    } else {
      const component = this.generator.components?.find(c => c.id === sectionId);
      if (component) currentHTML = component.template.html;
    }

    // メッセージ構築
    const messages = this.promptEngine
      ? this.promptEngine.buildMessages('customize_section', prompt, { currentHTML, type: this.type })
      : [
          { role: 'system', content: 'あなたはWebデザインの専門家です。HTMLセクションのカスタマイズを行います。HTMLのみ返してください。' },
          { role: 'user', content: `以下のHTMLセクションを次の指示に従って修正してください。\n\n指示: ${prompt}\n\n現在のHTML:\n${currentHTML}` },
        ];

    // ストリーミング生成
    let result = '';
    try {
      for await (const chunk of this.service.generateStream(messages)) {
        result += chunk;
        if (progressText) progressText.textContent = `${result.length} 文字を生成中...`;
      }
    } catch (e) {
      if (e.name === 'AbortError') return;
      throw e;
    } finally {
      this._setGeneratingState(false);
    }

    // HTMLを抽出
    const html = this._extractHTML(result);
    this._showResult(html, 'customize');
  }

  /** 新規セクション生成 */
  async generateSection(prompt) {
    this._setGeneratingState(true);
    const progressText = document.getElementById('aiProgressText');

    const messages = this.promptEngine
      ? this.promptEngine.buildMessages('generate_section', prompt, { type: this.type })
      : [
          { role: 'system', content: 'あなたはWebデザインの専門家です。指示に基づいて単一のHTMLセクションを生成します。HTMLのみ返してください。' },
          { role: 'user', content: `次の指示に基づいてHTMLセクションを1つ生成してください。\n\n${prompt}` },
        ];

    let result = '';
    try {
      for await (const chunk of this.service.generateStream(messages)) {
        result += chunk;
        if (progressText) progressText.textContent = `${result.length} 文字を生成中...`;
      }
    } catch (e) {
      if (e.name === 'AbortError') return;
      throw e;
    } finally {
      this._setGeneratingState(false);
    }

    const html = this._extractHTML(result);
    this._showResult(html, 'generate');
  }

  /** フルページ生成（2段階: 構成計画 → セクション個別生成） */
  async generateFullPage(prompt) {
    this._setGeneratingState(true);
    const progressText = document.getElementById('aiProgressText');

    // 第1段階: 構成計画
    if (progressText) progressText.textContent = '構成を計画中...';
    const planMessages = this.promptEngine
      ? this.promptEngine.buildMessages('plan_fullpage', prompt, { type: this.type })
      : [
          { role: 'system', content: 'あなたはWebデザインの専門家です。LPの構成計画をJSON配列で返してください。各要素は {type, description} を持ちます。' },
          { role: 'user', content: `次のテーマでLPの構成計画を立ててください。セクションは5-8個。\n\n${prompt}` },
        ];

    let planResult = '';
    try {
      for await (const chunk of this.service.generateStream(planMessages)) {
        planResult += chunk;
      }
    } catch (e) {
      if (e.name === 'AbortError') return;
      this._setGeneratingState(false);
      throw e;
    }

    // JSON抽出
    let plan;
    try {
      const jsonMatch = planResult.match(/\[[\s\S]*\]/);
      plan = jsonMatch ? JSON.parse(jsonMatch[0]) : [];
    } catch (e) {
      plan = [{ type: 'fullpage', description: prompt }];
    }

    // 第2段階: 各セクション生成
    let fullHTML = '';
    for (let i = 0; i < plan.length; i++) {
      if (progressText) progressText.textContent = `セクション ${i + 1}/${plan.length} を生成中...`;

      const sectionMessages = this.promptEngine
        ? this.promptEngine.buildMessages('generate_section', plan[i].description, { type: this.type, context: prompt })
        : [
            { role: 'system', content: 'HTMLセクションを1つ生成してください。HTMLのみ返してください。' },
            { role: 'user', content: `テーマ: ${prompt}\nセクション: ${plan[i].description}` },
          ];

      let sectionResult = '';
      try {
        for await (const chunk of this.service.generateStream(sectionMessages)) {
          sectionResult += chunk;
        }
      } catch (e) {
        if (e.name === 'AbortError') return;
        continue; // エラー時はスキップ
      }

      fullHTML += this._extractHTML(sectionResult) + '\n';
    }

    this._setGeneratingState(false);
    this._showResult(fullHTML, 'fullpage');
  }

  /** デザインシステム生成（CSS変数セット） */
  async generateDesignSystem(prompt) {
    this._setGeneratingState(true);
    const progressText = document.getElementById('aiProgressText');
    if (progressText) progressText.textContent = 'デザインシステムを生成中...';

    const messages = this.promptEngine
      ? this.promptEngine.buildMessages('design_system', prompt, { currentSettings: this.generator.designSettings })
      : [
          { role: 'system', content: 'あなたはWebデザインの専門家です。デザイン設定をJSON形式で返してください。キー: fontFamily, primaryColor, secondaryColor, accentColor, borderRadius, fontSizeScale, spacingScale' },
          { role: 'user', content: `次の方向性でデザイン設定を生成してください。\n\n${prompt}` },
        ];

    let result = '';
    try {
      for await (const chunk of this.service.generateStream(messages)) {
        result += chunk;
        if (progressText) progressText.textContent = `${result.length} 文字を生成中...`;
      }
    } catch (e) {
      if (e.name === 'AbortError') return;
      throw e;
    } finally {
      this._setGeneratingState(false);
    }

    // JSONを抽出して適用
    try {
      const jsonMatch = result.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const settings = JSON.parse(jsonMatch[0]);
        this._pendingResult = settings;
        this._pendingTaskType = 'design-system';

        // 即時プレビュー適用
        Object.assign(this.generator.designSettings, settings);
        if (typeof this.generator.applyDesignSettings === 'function') {
          this.generator.applyDesignSettings();
        }

        this._showResult(JSON.stringify(settings, null, 2), 'design-system');
      }
    } catch (e) {
      if (typeof this.generator.showNotification === 'function') {
        this.generator.showNotification('デザイン設定の解析に失敗しました', 'error');
      }
    }
  }

  /** デザインレビュー */
  async reviewDesign(prompt) {
    this._setGeneratingState(true);
    const progressText = document.getElementById('aiProgressText');
    if (progressText) progressText.textContent = '分析中...';

    // 現在の構成情報を収集
    let structureInfo = '';
    if (this.type === 'lp') {
      structureInfo = (this.generator.sections || []).map(s => s.template?.name || s.id).join(', ');
    } else {
      structureInfo = (this.generator.components || []).map(c => c.template?.name || c.id).join(', ');
    }

    const messages = this.promptEngine
      ? this.promptEngine.buildMessages('review', prompt, { structure: structureInfo, designSettings: this.generator.designSettings })
      : [
          { role: 'system', content: 'あなたはUX/UIの専門家です。Webページの構成とデザインをレビューし、改善提案を日本語で返してください。' },
          { role: 'user', content: `以下のページ構成をレビューしてください。\n\n構成: ${structureInfo}\nデザイン設定: ${JSON.stringify(this.generator.designSettings)}\n${prompt ? `追加の観点: ${prompt}` : ''}` },
        ];

    let result = '';
    try {
      for await (const chunk of this.service.generateStream(messages)) {
        result += chunk;
        if (progressText) progressText.textContent = `${result.length} 文字を分析中...`;
      }
    } catch (e) {
      if (e.name === 'AbortError') return;
      throw e;
    } finally {
      this._setGeneratingState(false);
    }

    // レビュー結果を通知で表示
    if (typeof this.generator.showNotification === 'function') {
      this.generator.showNotification('レビュー完了。結果はコンソールに出力されています');
    }
    console.log('[AI Review]', result);

    // 簡易表示: プロンプトエリアに結果を表示
    const textarea = document.getElementById('aiPrompt');
    if (textarea) textarea.value = result;
    this._updateCharCount();
  }

  // =========================================
  // 結果処理
  // =========================================

  _showResult(html, taskType) {
    this._pendingResult = html;
    this._pendingTaskType = taskType;

    const resultActions = document.getElementById('aiResultActions');
    const insertBtn = document.getElementById('aiInsertBtn');

    if (resultActions) resultActions.classList.add('active');

    // 挿入ボタンはgenerate/fullpageで表示
    if (insertBtn) {
      insertBtn.style.display = (taskType === 'generate' || taskType === 'fullpage') ? 'flex' : 'none';
    }

    // カスタマイズの場合はプレビューに即時反映
    if (taskType === 'customize' && this._targetSectionId) {
      this._applyResult(html, this._targetSectionId);
    }
  }

  _applyResult(html, sectionId) {
    if (this.type === 'lp') {
      const section = this.generator.sections.find(s => s.id === sectionId);
      if (section) {
        section.template.html = html;
        if (typeof this.generator.updatePreview === 'function') {
          this.generator.updatePreview();
        }
      }
    } else {
      const component = this.generator.components?.find(c => c.id === sectionId);
      if (component) {
        component.template.html = html;
        if (typeof this.generator.renderCanvas === 'function') {
          this.generator.renderCanvas();
        }
      }
    }
  }

  _onApprove() {
    const resultActions = document.getElementById('aiResultActions');
    if (resultActions) resultActions.classList.remove('active');

    // 状態を保存
    if (typeof this.generator.saveState === 'function') {
      this.generator.saveState();
    }

    if (typeof this.generator.showNotification === 'function') {
      this.generator.showNotification('AI生成結果を適用しました');
    }

    this._pendingResult = null;
    this._pendingTaskType = null;
    this._targetSectionId = null;
  }

  _onRetry() {
    const resultActions = document.getElementById('aiResultActions');
    if (resultActions) resultActions.classList.remove('active');

    // カスタマイズの場合は元に戻す（Undo）
    if (this._pendingTaskType === 'customize' && typeof this.generator.undo === 'function') {
      this.generator.undo();
    }

    this._pendingResult = null;
    this._pendingTaskType = null;

    // 再生成
    this._executeTask();
  }

  _onInsert() {
    const resultActions = document.getElementById('aiResultActions');
    if (resultActions) resultActions.classList.remove('active');

    if (this._pendingResult && typeof this.generator.insertAIGeneratedSection === 'function') {
      this.generator.insertAIGeneratedSection(this._pendingResult);
    }

    if (typeof this.generator.showNotification === 'function') {
      this.generator.showNotification('セクションを挿入しました');
    }

    this._pendingResult = null;
    this._pendingTaskType = null;
  }

  _cancelGeneration() {
    this.service.abort();
    this._setGeneratingState(false);
    if (typeof this.generator.showNotification === 'function') {
      this.generator.showNotification('生成を中止しました');
    }
  }

  // =========================================
  // セクションコントロールへのAIボタン追加
  // =========================================

  addAIButtonToSectionControls(wrapper) {
    if (!wrapper) return;
    // 既にAIボタンがある場合はスキップ
    if (wrapper.querySelector('.ai-customize-btn')) return;

    const controls = wrapper.querySelector('.lp-section-controls, .component-controls');
    if (!controls) return;

    const sectionId = wrapper.dataset.sectionId || wrapper.dataset.componentId;

    const btn = document.createElement('button');
    btn.className = (this.type === 'lp' ? 'lp-control-btn' : 'component-control') + ' ai-customize-btn';
    btn.title = 'AIでカスタマイズ';
    btn.setAttribute('aria-label', 'AIでカスタマイズ');
    btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a4 4 0 0 1 4 4v1a3 3 0 0 1 3 3v1a3 3 0 0 1-3 3h-1l-3 4-3-4H8a3 3 0 0 1-3-3v-1a3 3 0 0 1 3-3V6a4 4 0 0 1 4-4z" stroke-linecap="round" stroke-linejoin="round"/></svg>';

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      // タスクをカスタマイズに切り替え
      this.currentTask = 'customize';
      const taskGrid = document.getElementById('aiTaskGrid');
      if (taskGrid) {
        taskGrid.querySelectorAll('.ai-task-btn').forEach(b => b.classList.remove('active'));
        const customizeBtn = taskGrid.querySelector('[data-task="customize"]');
        if (customizeBtn) customizeBtn.classList.add('active');
      }
      this._updateTaskUI();

      // 対象セクションを選択
      if (this.type === 'lp') {
        const select = document.getElementById('aiTargetSection');
        if (select) select.value = sectionId;
      }
      this._targetSectionId = sectionId;

      // プロンプトにフォーカス
      const textarea = document.getElementById('aiPrompt');
      if (textarea) textarea.focus();

      // AIパネルまでスクロール
      const panel = document.getElementById('aiPanel');
      if (panel) panel.scrollIntoView({ behavior: 'smooth' });
    });

    controls.appendChild(btn);
  }

  // =========================================
  // ユーティリティ
  // =========================================

  /** AI応答からHTMLを抽出 */
  _extractHTML(text) {
    if (!text) return '';
    // ```html ... ``` ブロックを抽出
    const codeBlockMatch = text.match(/```(?:html)?\s*([\s\S]*?)```/);
    if (codeBlockMatch) return codeBlockMatch[1].trim();
    // <で始まるHTMLっぽいブロックを抽出
    const htmlMatch = text.match(/(<[a-zA-Z][\s\S]*>)/);
    if (htmlMatch) return htmlMatch[1].trim();
    return text.trim();
  }
}

window.AIUIController = AIUIController;
