const BASE_URL = "LINK DO SERVIDOR";

export const api = {
  transcreverAudio: async (fileUri: string): Promise<string> => {
    const formData = new FormData();
    formData.append("audio", {
      uri: fileUri,
      name: "audio.m4a",
      type: "audio/m4a",
    } as any);

    const response = await fetch(`${BASE_URL}/transcrever`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || "Erro ao transcrever o áudio");
    }

    return data.transcription;
  },

  analisarImagem: async (
    imageUri: string,
    desc: string = "",
  ): Promise<string> => {
    const formData = new FormData();

    formData.append("imagem", {
      uri: imageUri,
      name: "image.jpg",
      type: "image/jpeg",
    } as any);

    if (desc) {
      formData.append("desc", desc);
    }

    const response = await fetch(`${BASE_URL}/analisar-imagem`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      console.log("Erro na requisição:", JSON.stringify(data.detail, null, 2));
      throw new Error(data.detail || "Erro ao transcrever o áudio");
    }

    return data.result;
  },

  pesquisarResult: async (
    sintomas_digitados: string,
    analise_imagem: string,
  ): Promise<string> => {
    const response = await fetch(`${BASE_URL}/analisar-correspondencia`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sintomas_digitados,
        analise_imagem,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.log("Erro na requisição:", JSON.stringify(data.detail, null, 2));
      throw new Error(
        data.detail || "Erro ao processar os sintomas, tente novamente!",
      );
    }

    return data.result;
  },
};
