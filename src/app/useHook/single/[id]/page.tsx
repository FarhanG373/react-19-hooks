"use client";
import React, { use, Suspense } from "react";
import { getSingle } from "../../apiFile";
import ErrorBoundary from "../../ErrorBoundary";
import {
  Wrapper,
  FlexWrap,
  Flex,
  Card,
  Loader,
  BreadCrumb,
  Button,
  Paragraph,
  Label,
  List,
  ListItem,
} from "mfg-ui-components";

// Cache for API responses to avoid redundant requests
const promiseCache = new Map<string, Promise<unknown>>();
function useQuery<T>({ fn, key }: { fn: () => Promise<T>; key: string }) {
  if (!promiseCache.has(key)) {
    promiseCache.set(key, fn());
  }
  const promisres = promiseCache.get(key) as Promise<T>;
  const result = use(promisres);
  return result;
}

const Item = ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const data = useQuery({
    fn: () => getSingle(id),
    key: "singleData",
  });
  if (id) {
    return (
      <ErrorBoundary>
        <Suspense
          fallback={
            <Loader loaderBackground="lightOverlay"> Loading...</Loader>
          }
        >
          <Wrapper wrapClass="fixWrap">
            <BreadCrumb homeLabel="Home" seprator="/" className="mb-1" />

            <FlexWrap FlexWrap="wrap">
              <Flex FlexWidth="full-col">
                <Card
                  CardView="mfg-list"
                  CardImagePath={data.thumbnail}
                  CardImageAlt={data.title}
                  CardHeadingType="h3"
                  cardHeading={data.title}
                  cardBodyChildren={
                    <>
                      <Paragraph>{data.description}</Paragraph>
                      <Paragraph>
                        <Label>Brand :</Label>
                        {data.brand}
                      </Paragraph>
                      <Paragraph>
                        <Label>Price : </Label>
                        {data.price} $
                      </Paragraph>
                      <Paragraph>
                        <Label>Stock :</Label>
                        {data.stock > 0 ? "In Stock" : "Out of Stock"}
                      </Paragraph>
                      <div>
                        <Label>Tags :</Label>
                        <List Type="ul" ListStyleType="none">
                          {data.tags.map((tag: string) => {
                            return <ListItem key={tag}>{tag}</ListItem>;
                          })}
                        </List>
                      </div>
                    </>
                  }
                />
              </Flex>
            </FlexWrap>
          </Wrapper>
        </Suspense>
      </ErrorBoundary>
    );
  } else {
    return <div>Invalid product ID</div>;
  }
};

export default Item;
