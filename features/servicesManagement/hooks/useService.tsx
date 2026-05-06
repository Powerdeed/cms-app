"use client";

import useServiceApi from "./useServiceApi";
import useServiceAssets from "./useServiceAssets";
import useServiceEdit from "./useServiceEdit";
import useServiceStates from "./useServiceStates";

export default function useService() {
  const state = useServiceStates();

  const serviceEdit = useServiceEdit();
  const api = useServiceApi();
  const assets = useServiceAssets();

  return { state, actions: { ...serviceEdit, ...api, ...assets } };
}
