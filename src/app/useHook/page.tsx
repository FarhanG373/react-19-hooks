"use client";
import React, { use, Suspense } from "react";
import { Wrapper, FlexWrap, Flex, Card, Loader,BreadCrumb, Button } from "mfg-ui-components";
import { getData } from "./apiFile";
import ErrorBoundary from "./ErrorBoundary";

const promiseCache = new Map<string, Promise<unknown>>();
function useQuery<T>({ fn, key }: { fn: () => Promise<T>; key: string }) {
  if (!promiseCache.has(key)) {
    promiseCache.set(key, fn());
  }
  const promisres = promiseCache.get(key) as Promise<T>;
  const result = use(promisres);
  return result;
}
const UseHook = () => {
  const data = useQuery({
    fn: () => getData(),
    key: "usedHook",
  });

  return (
    <>
      {data && Array.isArray(data) && (
        <Wrapper wrapClass="fixWrap">
          <BreadCrumb homeLabel="Home" seprator="/" className="mb-1"/>
          <FlexWrap FlexWrap="wrap">
            <ErrorBoundary>
              <Suspense fallback={<Loader>Loading...</Loader>}>
                {data.map((item) => {
                  return (
                    <Flex key={item.id} FlexWidth="col-4">
                      <Card
                        CardImagePath={item.thumbnail}
                        CardHeadingType="h3"
                        cardHeading={item.title}
                        cardFooterChildren={<Button link={`/useHook/single/${item.id}`}>View More</Button>}
                      />
                    </Flex>
                  );
                })}
              </Suspense>
            </ErrorBoundary>
            <Flex FlexWidth="col-3">
              <Card />
            </Flex>
          </FlexWrap>
        </Wrapper>
      )}
    </>
  );
};

export default UseHook;
